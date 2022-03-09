import {useState, useEffect} from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles';
import { Global } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Drawer from '@mui/material/Drawer';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TitleBar from './TitleBar'
import Calendar from './Calendar'
import TimeSetting from './TimeSetting'
import TimePopup from './TimePopup'
import createCalendar from 'utils/create-calendar'

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const dayList = [
    '일','월','화','수','목','금','토'
]

// max schedule select number
const selectNum = 3

const Schedule = (props) => {

    const width = window.innerWidth
    const height = window.innerHeight

    // Drawer
    const [open, setOpen] = useState(false)

    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogType, setDialogType] = useState('alert')

    const today = new Date()
    const thisYear = today.getFullYear()
    const thisMonth = today.getMonth()    

    const [calendarDays, setCalendarDays] = useState([])

    const [selected, setSelected] = useState(props.scheduleCheck)
    const [numSelected, setNumSelected] = useState(0)

    const [timeEditting, setTimeEditting] = useState('')

    const [curSelected, setCurSelected] = useState({
        year: null,
        month: null,
        day: null,
        time: null,
    })
    
    const [curDate, setCurDate] = useState({
        year: thisYear,
        month: thisMonth,
    })

    const [curTime, setCurTime] = useState({
        startTime: null,
        endTime: null,
    })
    
    const [checkList, setCheckList] = useState([])

    useEffect(() => {
        if (props.scheduleCheck.length > 0) {
            props.scheduleCheck.map(el => {
                if (el.year === thisYear &&
                    el.month === thisMonth)
                {
                    setCheckList(el.day)
                }
            })
        } 
    },[])


    const makeCalendar = (year, month) => {
        const days = createCalendar(year, month)
        let ret = []
        days.map((day,idx) => {
            props.schedule.map(el => {
                if (dayList[idx%7] === el.day) {
                    ret = [...ret, {
                        day: day,
                        available: true,
                    }]
                }
            })
            if (ret.length === idx) {
                ret = [...ret, {
                    day: day,
                    available: false,
                }]
            }
        })
        return ret
    }

    const handleNextMonth = () => {
        if (curDate.month < 11) {
            setCurDate({
                ...curDate,
                month: curDate.month + 1,
            })
            let check = []
            selected.map(el => {
                if (el.year === curDate.year &&
                    el.month === curDate.month + 1)
                {
                    check = [...el.day]
                }
            })
            setCheckList(check)
        } else {
            setCurDate({
                year: curDate.year + 1,
                month: 0,
            })
            let check = []
            selected.map(el => {
                if (el.year === curDate.year + 1 &&
                    el.month === 1)
                {
                    check = [...el.day]
                }
            })
            setCheckList(check)
        }
    }

    const handlePrevMonth = () => {
        if (curDate.month > 0) {
            setCurDate({
                ...curDate,
                month: curDate.month - 1,
            })
            let check = []
            selected.map(el => {
                if (el.year === curDate.year &&
                    el.month === curDate.month - 1)
                {
                    check = [...el.day]
                }
            })
            setCheckList(check)
        } else {
            setCurDate({
                year: curDate.year - 1,
                month: 11,
            })
            let check = []
            selected.map(el => {
                if (el.year === curDate.year - 1 &&
                    el.month === 11)
                {
                    check = [...el.day]
                }
            })
            setCheckList(check)
        }
    }

    const handleCheck = idx => {
        if (calendarDays[idx].available && calendarDays[idx].day !== '') {
            if (numSelected < selectNum) {
                if (selected.filter(el => 
                    el.year === curDate.year &&
                    el.month === curDate.month &&
                    el.day.indexOf(idx) !== -1).length > 0)
                {
                    selected.map(el => {
                        if (el.year === curDate.year &&
                            el.month === curDate.month)
                        {
                            setCurSelected({
                                year: el.year,
                                month: el.month,
                                day: el.day[el.day.indexOf(idx)],
                                time: el.time[el.day.indexOf(idx)],
                            })
                            setCurTime(el.time[el.day.indexOf(idx)])
                        }
                    })
                    setOpen(true)
    
                } else {
                    const schedule = props.schedule.filter(el =>
                        el.day === dayList[idx%7])
        
                    const time = {
                        startTime: schedule[0].startTime,
                        endTime: schedule[0].endTime,
                    }    
                    
                    setCurSelected({
                        year: curDate.year,
                        month: curDate.month,
                        day: idx,
                        time: time
                    })
                    setCurTime(time)
                    setOpen(true)
                    setCheckList([...checkList, idx])
                }
            } else {
                console.log('alert')
                setDialogType('alert')
                setDialogOpen(true)
            }
        }
    }

    const handleStartTime = () => {
        setTimeEditting('start')
        setDialogType('time')
        setDialogOpen(true)
    }

    const handleEndTime = () => {
        setTimeEditting('end')
        setDialogType('time')
        setDialogOpen(true)
    }

    const handleResetTime = () => {
        if (timeEditting === 'start')
            setCurTime({
                ...curTime,
                startTime: curSelected.time.startTime,
            })
        else
            setCurTime({
                ...curTime,
                endTime: curSelected.time.endTime,
            })
    }

    const handleSetTime = time => {
        if (timeEditting === 'start') {
            setCurSelected({
                ...curSelected,
                time: {
                    ...curSelected.time,
                    startTime: time,
                }
            })
            setCurTime({
                ...curTime,
                startTime: time,
            })
        }
            
        else {
            setCurSelected({
                ...curSelected,
                time: {
                    ...curSelected.time,
                    endTime: time,
                }
            })
            setCurTime({
                ...curTime,
                endTime: time,
            })
        }
            
        setDialogOpen(false)
    }

    const handleAddSelectedSchedule = () => {
        let matched = false
        let sel = [...selected]

        for (let i=0; i < sel.length; i++) {
            if (sel[i].year === curSelected.year &&
                sel[i].month === curSelected.month)
            {
                matched = true
                if (sel[i].day.includes(curSelected.day)) {
                    sel[i].time[sel[i].day.indexOf(curSelected.day)]
                        = curSelected.time
                } else {
                    sel[i].day = [...sel[i].day, curSelected.day]
                    sel[i].time = [...sel[i].time, curSelected.time]
                    sel[i].dateDay = [...sel[i].dateDay, calendarDays[curSelected.day].day]
                }
            }
        }
        if (!matched) {
            sel = [...selected,
                {
                    year: curDate.year,
                    month: curDate.month,
                    day: [curSelected.day],
                    time: [curSelected.time],
                    dateDay: [calendarDays[curSelected.day].day]
                }
            ]
        }
        setSelected(sel)
        setNumSelected(numSelected+1)
        setOpen(false)
    }
    
    const handleAlertClose = () => {
        setDialogOpen(false)
    }

    const handleDialogClose = () => {
        setCurTime({
            startTime: curSelected.time.startTime,
            endTime: curSelected.time.endTime,
        })
        setDialogOpen(false)
    }

    const toggleDrawer = (newOpen) => () => {
        if (!newOpen) {
            let matched = false
            for (let i=0; i < selected.length; i++) {
                if (selected[i].year === curDate.year &&
                    selected[i].month === curDate.month)
                {
                    matched = true
                    setCheckList(selected[i].day)
                }
            }
            if (!matched) {
                setCheckList([])
            }
        }
        setOpen(newOpen);
    };

    return (
        <>
        <Grid container
            direction='column'
            sx={{
                width: '100%',
                height: height,
                backgroundColor: '#000000'
            }}
        >
            <Grid item>
                <TitleBar
                    onClickBack={props.onClickBack}
                    onClickClose={props.onClickBack}
                    title={[
                        '직업인에게 제안할',
                        '날짜와 시간을 선택하세요.'
                    ]}
                />
            </Grid>
            <Grid item container
                direction='column'
                sx={{
                    height: height * 0.8,
                    borderTopLeftRadius: '30px',
                    borderTopRightRadius: '30px',
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Grid item
                    sx={{
                        width: '100%',
                        pt: 8,
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Calendar
                        curDate={curDate}
                        calendarDays={calendarDays}
                        setCalendarDays={setCalendarDays}
                        makeCalendar={makeCalendar}
                        handlePrevMonth={handlePrevMonth}
                        handleNextMonth={handleNextMonth}
                        handleCheck={handleCheck}
                        checkList={checkList}
                    />
                </Grid>
                <Grid item 
                    sx={{
                        p: 2,
                        width: '100%',
                        position: 'absolute',
                        bottom: height * 0.15,
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                    <Button variant='contained'
                        onClick={() => {
                            props.setScheduleCheck(selected)
                            props.onClickNext()
                        }}
                        sx={{
                            backgroundColor: '#000000',
                            width: '100%',
                            height: 50,
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant='body1'
                            sx={{fontWeight: 'fontWeightBold'}}
                        >
                            다음
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </Grid>


        <Root>
            <CssBaseline />
                <Global
                    styles={{
                        '.MuiDrawer-root > .MuiPaper-root': {
                          height: '40%',
                          overflow: 'hidden',
                        },
                        '.MuiDrawer-paper': {
                            borderTopLeftRadius: 24,
                            borderTopRightRadius: 24,
                        }
                    }}
                />
                <Drawer
                    anchor="bottom"
                    open={open}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{overflow: 'auto',}}
                > 
                    <TimeSetting 
                        month={curDate.month}
                        day={checkList.length > 0 
                            ? calendarDays[checkList.slice(-1)[0]].day
                            : null}
                        curSelected={curSelected}
                        handleStartTime={handleStartTime}
                        handleEndTime={handleEndTime}
                        handleAddSelectedSchedule={handleAddSelectedSchedule}
                    />
                </Drawer>
        </Root>

        {dialogType === 'alert'
        ?
        <Dialog 
            open={dialogOpen}
            onClose={handleAlertClose}
        >
            <DialogTitle>
                {'최대 3개까지 선택 가능합니다.'}
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleAlertClose}>
                    확인
                </Button>
            </DialogActions>
        </Dialog>
        :
        <Dialog
            open={dialogOpen}
            onClose={handleDialogClose}
        >
            <DialogContent 
                sx={{
                    width: width * 0.8, 
                    p: 0,
                }}
            >
                <TimePopup
                    timeEditting={timeEditting}
                    curTime={curTime}
                    handleResetTime={handleResetTime}
                    handleSetTime={handleSetTime}
                />
            </DialogContent>
        </Dialog>
        }
        </>
    )
}

export default Schedule