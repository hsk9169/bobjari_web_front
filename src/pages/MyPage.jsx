import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PageBox from 'components/styled/PageBox'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress';
import {useState} from 'react';
import {getJWT, verifyJWT} from 'utils/handle-jwt'
import {MenteeMypage, MentorMypage} from 'components/MyPage'
import {useSelector, useDispatch} from 'react-redux'
import {selectSessions, updateSession, addSession} from 'slices/session';
const axios = require('axios');

const Mypage = ({context, history}) => {

    const dispatch = useDispatch();
    const session = useSelector(selectSessions)[1].session
    context.setBotNav(true)

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
                    email: session.userInfo.email,
                },
            })
            .then(res => {
                dispatch(updateSession(res.data))
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
                    role: session.roleInfo.role,
                    email: session.userInfo.email,
                },
            })
            .then(res => {
                dispatch(updateSession(res.data))
                setIsChanging(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <PageBox sx={{width: '100%', pb: 4}}/>
            <PageBox sx={{
                display: 'flex',
                width: '100%',
                }}
            >
                {session.roleInfo.role === 'mentee'
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