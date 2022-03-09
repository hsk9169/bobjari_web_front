import {useState, useEffect} from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const TimeSetting = (props) => {

    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    useEffect(() => {
        if (props.curSelected.time !== null) {
            const startTime = props.curSelected.time.startTime.split(':')
            const endTime = props.curSelected.time.endTime.split(':')
            if (startTime[0] > 12) {
                setStartTime(`오후 ${startTime[0]-12}:${startTime[1]}`)
            } else {
                setStartTime(`오전 ${startTime[0]}:${startTime[1]}`)
            }
            if (endTime[0] > 12) {
                setEndTime(`오후 ${endTime[0]-12}:${endTime[1]}`)
            } else {
                setEndTime(`오전 ${endTime[0]}:${endTime[1]}`)
            }
        }
        
    }, [props.curSelected.time])

    return (
        <>
        <Grid container 
            direction='column'
            sx={{
                pt: 2,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Grid item>
                <Typography variant='h6'
                    sx={{fontWeight: 'fontWeightBold'}}
                >
                    {props.month+1}월&nbsp;{props.day}일
                </Typography>
            </Grid>

            <Grid item 
                sx={{pt: 2, width: '100%'}}>
                <Divider />
            </Grid>
            
            <Grid item container
                sx={{width: '100%', p: 1}}
            >
                <Grid item container
                    direction='column'
                    sx={{
                        width: '50%',
                        p: 1,
                        display: 'flex',
                        alignItems: 'cetner'
                    }}
                >
                    <Grid item
                        sx={{
                            pt: 2,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Typography variant='body1'
                            sx={{color: 'disabled'}}>
                            시작
                        </Typography>
                    </Grid>
                    <Grid item
                        sx={{
                            pt: 1,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Box 
                            onClick={props.handleStartTime}
                            sx={{
                                width: '100%',
                                p: 1,
                                border: 2,
                                borderRadius: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Typography variant='h6'
                                sx={{fontWeight: 'fontWeightBold'}}>
                                {startTime}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Grid item container
                    direction='column'
                    sx={{
                        width: '50%',
                        p: 1,
                        display: 'flex',
                        alignItems: 'cetner'
                    }}
                >
                    <Grid item
                        sx={{
                            pt: 2,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Typography variant='body1'
                            sx={{color: 'disabled'}}>
                            종료
                        </Typography>
                    </Grid>
                    <Grid item
                        sx={{
                            pt: 1,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Box 
                            onClick={props.handleEndTime}
                            sx={{
                                width: '100%',
                                p: 1,
                                border: 2,
                                borderRadius: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Typography variant='h6'
                                sx={{fontWeight: 'fontWeightBold'}}>
                                {endTime}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item 
                sx={{
                    pt: 2,
                    p:2,  
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Button 
                    onClick={props.handleAddSelectedSchedule}
                    sx={{
                        width: '100%',
                        height: 50,
                        backgroundColor: '#000000',
                        borderRadius: 2,
                    }} 
                    variant='contained'
                >
                    <Typography variant='h6'
                        sx={{
                            color: '#ffffff',
                            fontWeight: 'fontWeightBold'
                        }}
                    >
                        시간 확정
                    </Typography>
                </Button>
            </Grid>
        </Grid>

        </>
    )
}

export default TimeSetting