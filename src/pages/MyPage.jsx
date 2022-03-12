import PageBox from 'components/styled/PageBox'
import {useState} from 'react';
import {getJWT} from 'utils/handle-jwt'
import {MenteeMypage, MentorMypage} from 'components/MyPage'
import {useSelector, useDispatch} from 'react-redux'
import {selectSessions, changeSessionRole, toggleSessionSearchAllow} from 'slices/session';
import {updateBotNav} from 'slices/manage'
import { selectBasePath } from 'slices/basePath'
const axios = require('axios')

const Mypage = ({history}) => {

    const dispatch = useDispatch();
    const session = useSelector(selectSessions)[1].session
    dispatch(updateBotNav(true))
    const basePath = useSelector(selectBasePath)   

    const [isChanging, setIsChanging] = useState(false)

    const handleEdit = () => {
        history.push('/mypage/edit')
    }

    const handleAllowSearch = async () => {
        await axios.get(basePath.path + process.env.REACT_APP_API_MENTOR_SEARCH_ALLOW_TOGGLE,
            {
                headers: {
                    Authorization: `Bearer ${getJWT().accessToken}`,
                },
                params: {
                    curState: session.mentor.searchAllow,
                    mentorId: session.mentor.id,
                },
            })
            .then(res => {
                dispatch(toggleSessionSearchAllow(res.data))
            })
            .catch(err => {
                console.log(err)
            })
    }

    // Update Mentee & Mentor 'role' as swap, and get res as changed role account
    const handleRoleChange = async () => {
        setIsChanging(true)
        await axios.get(process.env.REACT_APP_API_USER_ROLE_CHANGE,
            {
                headers: {
                    Authorization: `Bearer ${getJWT().accessToken}`,
                },
                params: {
                    role: session.role,
                    userId: session.id,
                },
            })
            .then(res => {
                try {
                    if (res.data !== session.role) {
                        dispatch(changeSessionRole(res.data))
                    }                
                } catch {}
                setIsChanging(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <PageBox sx={{
                display: 'flex',
                width: '100%',
                }}
            >
                {session.role === 'mentee'
                    ? <MenteeMypage 
                        handleEdit={handleEdit} 
                        handleRoleChange={handleRoleChange}
                        isChanging={isChanging}
                    />
                    : <MentorMypage
                        handleEdit={handleEdit} 
                        handleRoleChange={handleRoleChange}
                        handleAllowSearch={handleAllowSearch}
                        isChanging={isChanging}
                    />
                }

            </PageBox>
            <PageBox sx={{pb:7}} />
        </div>
    )
}

export default Mypage;