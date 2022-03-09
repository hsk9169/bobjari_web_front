import {useState, useEffect} from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';

const dayList = [
    '일','월','화','수','목','금','토'
]

const Calendar = (props) => {

    const height = window.innerHeight


    useEffect(() => {
        const calendar = props.makeCalendar(props.curDate.year, props.curDate.month)
        props.setCalendarDays(calendar)
    }, [props.curDate])


    return (
        <Grid container
            direction='column'
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <Grid item container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Grid item
                    sx={{
                        width: '30%',
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                >
                    <ButtonBase>
                        <ArrowBackIcon 
                            onClick={props.handlePrevMonth}
                        />
                    </ButtonBase>
                </Grid>
                <Grid item
                    sx={{
                        width: '40%',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Typography variant='h6'
                        sx={{fontWeight: 'fontWeightBold'}} 
                    >
                        {props.curDate.year}년&nbsp;{props.curDate.month + 1}월
                    </Typography>
                </Grid>
                <Grid item
                    sx={{
                        width: '30%',
                        display: 'flex',
                        justifyContent: 'flex-start'
                    }}
                >
                    <ButtonBase>
                        <ArrowForwardIcon 
                            onClick={props.handleNextMonth}
                        />
                    </ButtonBase>
                </Grid>
            </Grid>

            <Grid item container
                sx={{
                    p: 2,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                {dayList.map(el => (
                    <Grid item sx={{
                        pt: 2,
                        width: `${100/7}%`,
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Typography variant='body1'
                            sx={{fontWeight: 'fontWeightBold'}}
                        >
                            {el}
                        </Typography>
                    </Grid>
                ))}
            </Grid>

            <Grid item container
                sx={{
                    p: 2,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                {props.calendarDays.map((el,idx) => (
                    <Grid item 
                        sx={{
                            width: `${100/7}%`,
                            display: 'flex',
                            justifyContent: 'center',
                            p:0.5,
                        }}
                    >
                        <Box 
                            disabled={true}
                            onClick={() => props.handleCheck(idx)}
                            sx={{
                                width: '100%',
                                height: height * 0.05,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 2,
                                backgroundColor: props.checkList.includes(idx)
                                                ? '#f75910'
                                                : '#ffffff'
                            }}
                        >
                            <Typography variant='body1'
                                color={!el.available ? '#bdbdbd'
                                        : props.checkList.includes(idx) 
                                        ? '#ffffff' 
                                        : '#000000'}
                                sx={{fontWeight: 'fontWeightBold'}}
                            >
                                {el.day}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}

export default Calendar