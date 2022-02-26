import PageBox from 'components/styled/PageBox'
import {useState} from 'react';
import {getJWT} from 'utils/handle-jwt'
import {MenteeMypage, MentorMypage} from 'components/MyPage'
import {useSelector, useDispatch} from 'react-redux'
import {selectSessions, changeSessionRole, toggleSessionSearchAllow} from 'slices/session';
import {updateBotNav} from 'slices/manage'
const axios = require('axios')

const Mypage = ({history}) => {

    const dispatch = useDispatch();
    const session = useSelector(selectSessions)[1].session
    dispatch(updateBotNav(true))

    const [isChanging, setIsChanging] = useState(false)

    const handleEdit = () => {
        history.push('/mypage/edit')
    }

    const handleAllowSearch = async () => {
        await axios.get(process.env.REACT_APP_API_USER_SEARCH_ALLOW_TOGGLE,
            {
                headers: {
                    Authorization: `Bearer ${getJWT().accessToken}`,
                },
                params: {
                    curState: session.searchAllow,
                    email: session.profile.email,
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
                    email: session.profile.email,
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