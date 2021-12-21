import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Divider from '@mui/material/Divider';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import { grey } from '@mui/material/colors';
       
import IOSSwitch from '../../styled/IOSSwitch';


export default function ControlEtc(props) {

    const handleSwitch = event => {

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
                            sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Grid container direction='row'>
                                <Grid item xs={2}>
                                    <SearchOutlinedIcon sx={{width:30, height:30}} />
                                </Grid>
                                <Grid item xs={8.5}>
                                    <Typography variant='h6' sx={{color: grey[900]}}>
                                        검색창에 프로필 공개
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <IOSSwitch value={props.state.isMentor} color="secondary"
                                        onChange={handleSwitch} />
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
                            sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Grid container direction='row'>
                                <Grid item xs={2}>
                                    <VerifiedUserOutlinedIcon sx={{width:30, height:30}} />
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant='h6' sx={{color: grey[900]}}>
                                        직업 인증
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