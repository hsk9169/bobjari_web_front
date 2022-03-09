import {useState, useEffect} from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import { withStyles } from "@material-ui/core/styles";

const styles = {
    text: {
        fontSize: 30,
        fontWeight: 600,
    }
}
const TimePopup = (props) => {

    const { classes } = props

    const height = window.innerHeight

    const [sun, setSun] = useState(true)
    const [hour, setHour] = useState('')
    const [min, setMin] = useState('')

    const makeTime = () => {
        let time
        if (sun) {
            if (hour < 10) 
                time = `${hour.slice(-1)}:${min}`
            else
                time = `${hour}:${min}`
        } else {
            time = `${parseInt(hour)+12}:${min}`
        }
        
        return time
    }

    const handleHour = event => {
        setHour(event.target.value)
    }

    const handleMin = event => {
        setMin(event.target.value)
    }


    useEffect(() => {
        if (props.timeEditting === 'start') {
            const time = props.curTime.startTime.split(':')
            if (time[0] > 12) {
                setSun(false)
                if (time[0] < 22) 
                    setHour('0' + (time[0]-12))
                else
                    setHour(time[0]-12)
            } else {
                setSun(true)
                if (time[0] < 10)
                    setHour('0' + time[0])
                else
                    setHour(time[0])
            }
            setMin(time[1])
        } else {
            const time = props.curTime.endTime.split(':')
            if (time[0] > 12) {
                setSun(false)
                if (time[0] < 22)
                    setHour('0' + (time[0]-12))
                else
                    setHour(time[0]-12)
            } else {
                setSun(true)
                if (time[0] < 10)
                    setHour('0' + time[0])
                else
                    setHour(time[0])
            }
            setMin(time[1])
        }
    }, [props.curTime])


    return (
        <Grid container
            direction='column'
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Grid item container
                sx={{
                    p: 2,
                    width: '100%',
                    height: height * 0.12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Grid item container
                    sx={{width: '55%'}}    
                >
                    <Grid item
                        onClick={() => setSun(!sun)}
                        sx={{
                            width: '100%',
                            backgroundColor: '#e0e0e0',
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 0.5
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: sun ? '#ffffff' : '#e0e0e0',
                                width: '50%',
                                height: height * 0.05,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 1
                            }}
                        >
                            <Typography variant='body1'
                                sx={{fontWeight: 'fontWeightBold'}}
                            >
                                오전
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: sun ? '#e0e0e0' : '#ffffff',
                                width: '48%',
                                height: height * 0.05,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 1
                            }}
                        >
                            <Typography variant='body1'
                                sx={{fontWeight: 'fontWeightBold'}}
                            >
                                오후
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Grid item
                    sx={{
                        width: '45%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <Paper elevation={0}
                        sx={{
                            backgroundColor: '#e0e0e0',
                            borderRadius: 2,
                            width: '80%',
                            height: height * 0.06,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }} 
                    >
                        <Grid container 
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',        
                            }}
                        >
                            <Grid item 
                                sx={{
                                    width: '35%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <TextField
                                    variant='standard'
                                    InputProps={{
                                        classes: {input: classes.text},
                                        disableUnderline: true
                                    }}
                                    type='number'
                                    value={hour}
                                    defaultValue={hour}
                                    onChange={handleHour}
                                />
                            </Grid>
                            <Grid item 
                                sx={{
                                    width: '20%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <h1 style={{fontWeight: 600}}>:</h1>
                            </Grid>
                            <Grid item 
                                sx={{
                                    width: '35%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <TextField
                                    variant='standard'
                                    InputProps={{
                                        classes: {input: classes.text},
                                        disableUnderline: true
                                    }}
                                    type='number'
                                    value={min}
                                    defaultValue={min}
                                    onChange={handleMin}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                
            </Grid>

            <Grid item
                sx={{
                    width: '100%'}}
            >
                <Divider />
            </Grid>

            <Grid item container
                sx={{
                    width: '100%',
                    p: 1.5
                }}
            >
                <Grid item
                    sx={{
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'flex-start'
                    }}
                >
                    <Typography 
                        variant='body1'
                        onClick={props.handleResetTime}
                        sx={{
                            color: '#f75910',
                            fontWeight: 'fontWeightBold'
                        }}
                    >
                        재설정
                    </Typography>
                </Grid>
                <Grid item
                    sx={{
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                >
                    <Typography 
                        variant='body1'
                        onClick={() => {
                            const time = makeTime()
                            props.handleSetTime(time)
                        }}
                        sx={{
                            color: '#f75910',
                            fontWeight: 'fontWeightBold'
                        }}
                    >
                        확인
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
        
    )
}

export default withStyles(styles)(TimePopup)