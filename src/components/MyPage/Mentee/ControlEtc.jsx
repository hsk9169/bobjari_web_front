import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import { grey } from '@mui/material/colors';


export default function ControlEtc(props) {

    const handleSwitch = event => {

    }

    const handleAlarmClick = () => {
        console.log('알림설정')
    }

    const handleNotifyClick = () => {
        console.log('공지사항')
    }

    const handleEventClick = () => {
        console.log('이벤트')
    }

    const handleFaqClick = () => {
        console.log('자주 묻는 질문')
    }

    const handleCsClick = () => {
        console.log('고객센터')
    }

    const handlePolicyClick = () => {
        console.log('약관 및 정책')
    }


    return (
            <Box component='div'
                sx={{
                    maxWidth: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Grid container direction='column'
                    sx={{
                        width: '85%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Grid item sx={{
                                width: '100%',
                                height: 60,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                        <Paper elevation={0}
                            onClick={handleAlarmClick}
                            sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Grid container direction='row'>
                                <Grid item xs={2}>
                                    <NotificationsNoneIcon sx={{width:30, height:30}} />
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant='h6' sx={{color: grey[900]}}>
                                        알림 설정
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>       
                    </Grid>
                    <Divider variant="fullWidth" sx={{width: '100%'}}/>

                    <Grid item sx={{
                                width: '100%',
                                height: 60,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                        <Paper elevation={0}
                            onClick={handleNotifyClick}
                            sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Grid container direction='row'>
                                <Grid item xs={2}>
                                    <VolumeUpOutlinedIcon sx={{width:30, height:30}} />
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant='h6' sx={{color: grey[900]}}>
                                        공지사항
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>       
                    </Grid>
                    <Divider variant="fullWidth" sx={{width: '100%'}}/>

                    <Grid item sx={{
                                width: '100%',
                                height: 60,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                        <Paper elevation={0}
                            onClick={handleEventClick}
                            sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Grid container direction='row'>
                                <Grid item xs={2}>
                                    <CelebrationOutlinedIcon sx={{width:30, height:30}} />
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant='h6' sx={{color: grey[900]}}>
                                        이벤트
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>       
                    </Grid>
                    <Divider variant="fullWidth" sx={{width: '100%'}}/>

                    <Grid item sx={{
                                width: '100%',
                                height: 60,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                        <Paper elevation={0}
                            onClick={handleFaqClick}
                            sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Grid container direction='row'>
                                <Grid item xs={2}>
                                    <HelpOutlineOutlinedIcon sx={{width:30, height:30}} />
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant='h6' sx={{color: grey[900]}}>
                                        자주 묻는 질문
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>       
                    </Grid>
                    <Divider variant="fullWidth" sx={{width: '100%'}}/>

                    <Grid item sx={{
                                width: '100%',
                                height: 60,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                        <Paper elevation={0}
                            onClick={handleCsClick}
                            sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Grid container direction='row'>
                                <Grid item xs={2}>
                                    <HeadsetMicOutlinedIcon sx={{width:30, height:30}} />
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant='h6' sx={{color: grey[900]}}>
                                        고객센터
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>       
                    </Grid>
                    <Divider variant="fullWidth" sx={{width: '100%'}}/>

                    <Grid item sx={{
                                width: '100%',
                                height: 60,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                        <Paper elevation={0}
                            onClick={handlePolicyClick}
                            sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Grid container direction='row'>
                                <Grid item xs={2}>
                                    <AssignmentOutlinedIcon sx={{width:30, height:30}} />
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant='h6' sx={{color: grey[900]}}>
                                        약관 및 정책
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>       
                    </Grid>
                </Grid>
            </Box>
    );
}