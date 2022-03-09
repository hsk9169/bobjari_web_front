import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress';
import TopBar from './TopBar'
import Proposal from './Proposal'
import {ProposeCard} from 'components/Cards'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Button } from '@mui/material'
import PageBox from 'components/styled/PageBox'

const Propose = (props) => {

    return (
        <>
        <Grid container
            direction='column'
            sx={{width: '100%'}}
        >
            <Grid item container>
                <TopBar
                    onClickBack={props.onClickBack}
                    onClickClose={props.onClickClose}
                />
            </Grid>
            <Grid item>
                <PageBox
                    sx={{
                        pt: 2,
                        pb: 2,
                        position: 'absolute',
                        top: 50,
                        bottom: 100,
                        width: '100%',
                    }}
                >
                    <Grid container direction='column'>
                        <Grid item container
                            sx={{pt: 1, pb: 1}}
                        >
                            <ProposeCard
                                image={props.mentorData.image}
                                nickname={props.mentorData.nickname}
                                job={props.mentorData.job}
                                years={props.mentorData.years}
                                company={props.mentorData.company}
                                rate={props.mentorData.rate}
                            />
                        </Grid>
                        <Grid item sx={{width: '100%'}}>
                            <Divider sx={{pb: 1, color: '#e0e0e0'}}/>
                        </Grid>

                        <Grid item 
                            sx={{
                                width: '100%',
                                pt: 1, pb: 1
                            }}
                        >
                            <Proposal 
                                location={props.location}
                                scheduleCheck={props.scheduleCheck}
                                locationCheck={props.locationCheck}
                                onClickSchedule={props.onClickSchedule}
                                onClickLocation={props.onClickLocation}
                            />
                        </Grid>
                        <Grid item sx={{width: '100%'}}>
                            <Divider sx={{pb: 1, color: '#e0e0e0'}}/>
                        </Grid>
                        
                        <Grid item container 
                            sx={{
                                width: '100%',
                                pt: 1, pb: 1,
                                p: 3,
                            }}
                        >
                            <Grid item 
                                sx={{
                                    width: '40%',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                <Typography variant='h6'
                                    sx={{fontWeight: 'fontWeightBold'}}
                                >
                                    감사비
                                </Typography>
                            </Grid>
                            <Grid item 
                                sx={{
                                    width: '60%',
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Typography varaint='h6'
                                    sx={{fontWeight: 'fontWeightBold'}}
                                >
                                    {props.fee.select === 0
                                    ?
                                        <Typography variant='h6'
                                            sx={{fontWeight: 'fontWeightBold'}}
                                        >
                                            {`시간 당 ${props.fee.value}원`}
                                        </Typography>
                                    : props.fee.select === 1
                                    ? 
                                        <Typography variant='h6'
                                            sx={{fontWeight: 'fontWeightBold'}}
                                        >
                                            식사 대접으로 충분해요!
                                        </Typography>
                                    : props.fee.select === 2  
                                    ?
                                        <Typography variant='h6'
                                            sx={{fontWeight: 'fontWeightBold'}}
                                        >
                                            커피 대접으로 충분해요!
                                        </Typography>
                                    :
                                        <Typography variant='h6'
                                            sx={{fontWeight: 'fontWeightBold'}}
                                        >
                                            -
                                        </Typography>
                                    }
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item sx={{width: '100%'}}>
                            <Divider sx={{pb: 1, color: '#e0e0e0'}}/>
                        </Grid>
                                
                        <Grid item container
                            sx={{
                                width: '100%',
                                p: 2,
                            }}
                        >
                            <Grid item
                                sx={{
                                    width: '15%',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                }}
                            >
                                <InfoOutlinedIcon 
                                    sx={{width: 50, height: 50}}
                                />
                            </Grid>
                            <Grid item
                                sx={{
                                    width: '85%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <b style={{fontSize: '15px'}}>
                                    직업인이 수락하기 전까지 밥자리는 확정된 것이 아닙니다.
                                    직업인의 응답 이후 결제가 가능합니다.
                                </b>                                    
                            </Grid>
                        </Grid>
                    </Grid>
                </PageBox>
            </Grid>
            
        </Grid>


        <Grid container
            style={{zIndex: 1500}}
            sx={{
                width: '100%',
                height: 100,
                position: 'fixed',
                bottom: 0,
                backgroundColor: '#ffffff',
            }}
        >
            <Grid item
                sx={{
                    p: 2,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                }}
            >
                <Button variant='contained'
                    onClick={props.onClickPropose}
                    disabled={props.dialogOpen}
                    sx={{
                        width: '100%',
                        height: 50,
                        backgroundColor: '#f75910',
                        borderRadius: 2
                    }}
                >
                    {props.isPending
                    ?
                        <CircularProgress size={20} thickness={2} />
                    :
                        <Typography variant='h6'
                            sx={{fontWeight: 'fontWeightBold'}}
                        >
                            밥자리 신청 보내기
                        </Typography>
                    }
                </Button>
            </Grid>
        </Grid>
        </>
    )
}

export default Propose