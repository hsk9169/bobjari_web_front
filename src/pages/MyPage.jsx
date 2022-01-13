import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PageBox from 'components/styled/PageBox'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider';
import {useState} from 'react';
import {getJWT, verifyJWT} from 'utils/handle-jwt'
import {ProfileCard, ProfileInfo, ControlEtc} from 'components/MyPage/Mentee'
import {useSelector} from 'react-redux'
import {selectSessions} from 'slices/session';
const axios = require('axios');

const Mypage = ({context, history}) => {

    const [popUp, setPopUp] = useState('')
    const session = useSelector(selectSessions)[1].session
    context.setBotNav(true)

    const state = {
        interests: session.interests,
        imgUrl: (session.profileImg.contentType==='url' 
            ? session.profileImg.data
            : `data:${session.profileImg.contentType};base64,${session.profileImg.data}`),
        nickname: session.userInfo.nickname,
    }

    const handleEdit = () => {
        history.push('/mypage/edit')
    }

    return (
        <div>
            <PageBox sx={{width: '100%', pb: 4}}/>
            <PageBox sx={{
                display: 'flex',
                width: '100%',
                }}
            >
                {session.role === 'mentee'
                    ?<Grid container direction='column'>
                        <Grid item>
                            <ProfileCard state={state} editProfile={handleEdit}/>
                        </Grid>
                        <Grid item>
                            <Divider />
                        </Grid>
                        <Grid item>
                            <ProfileInfo />
                        </Grid>
                        <Grid item>
                            <Divider />
                        </Grid>
                        <Grid item>
                            <PageBox sx={{display: 'flex', p:3}}>
                                <Button variant='outlined' 
                                    sx={{width: '100%', height: 45, 
                                        border: 2, borderRadius: 2}}>
                                    <Typography variant='subtitle1' 
                                        sx={{fontWeight: 'fontWeightBold'}}>
                                        직업인으로 전환
                                    </Typography>
                                </Button>
                            </PageBox>
                        </Grid>
                        <Grid item>
                            <ControlEtc />
                        </Grid>
                    </Grid>
                    :<h1>Mentor Page is on dev...</h1>
                }

            </PageBox>
            <PageBox sx={{pb:7}} />
        </div>
    )
}

export default Mypage;