import React, { useState, useEffect } from 'react';
import { addSession } from '../actions/index';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ButtonBase from '@mui/material/ButtonBase';
import LinearProgress from '@mui/material/LinearProgress';
import { red } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';


const mapDispatchToProps = dispatch => {
    return {
        addSession: session => dispatch(addSession(session)),
    };
};

const mapStateToProps = state => {
    return {
        api: state.api,
    };
};

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 45,
        width: 200,
        padding: '0 30px',
    },
});

const days = ['월','화','수','목','금','토','일'];

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));
  


const SignUpMentorScheduleComp = (props) => {
    
    const classes = useStyles();

    const [state, setState] = useState({
        initialized: false,
        isDate: false,
        current: null,
        day: '',
        startTime: '',
        endTime: '',
        view: Array.from({length: days.length}, () => 'outlined'),
        schedules: [],
        progress: props.location.data.progress,
        progressRatio: props.location.data.progressRatio,
    });

    console.log(state)

    // Drawer
    const { drawerWindow } = props;
    const [open, setOpen] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);


    const handleAdd = (event) => {
        setState({
            ...state,
            current: null,
            day: '',
            startTime: '',
            endTime: '',
        })
        setOpen(true);
    };

    const handleSchedule = index => event => {
        console.log(index)
        setState({
            ...state,
            current: index,
            day: state.schedules[index].day,
            startTime: state.schedules[index].startTime,
            endTime: state.schedules[index].endTime,
            view: (days.map(el => {
                if (el === state.schedules[index].day) {
                    return 'contained';
                } else {
                    return 'outlined';
                }
            }))
        });
        setOpen(true)
    }

    const handleDelete = schedule => event => {
        setState({
            ...state,
            schedules: [...state.schedules.filter((el) =>
                            el.day !== schedule.day)]
        })
    }

    const handleDay = idx => event => {
        setState({
            ...state,
            day: event.target.innerText,
            view: (state.view.map((element,index) => {
                if(index === idx) {
                    return 'contained'
                }
                else return 'outlined'
            }))
        })
    }

    const handleDone = event => {
        const check = state.schedules.filter(el => 
            (el.day === state.day &&
            el.startTime === state.startTime &&
            el.endTime === state.endTime));
        if (check.length === 0) {
            const schedule = {
                day: state.day,
                startTime: state.startTime,
                endTime: state.endTime,
            };
            if (state.current !== null) {
                setState({
                    ...state,
                    schedules: [...state.schedules.map((el,idx) => {
                        if (idx === state.current) {
                            return schedule;
                        } else {return el}
                    })]
                })
            } else {
                setState({
                    ...state,
                    schedules: [...state.schedules, schedule],
                });
            }
            setOpen(false);
        } else {
            setDialogOpen(true);
        }        
    }

    const handleNext = event => {
        props.history.push({
            pathname: '/signup/mentor/location',
            data: {
                email: props.location.data.email,
                age: props.location.data.age,
                gender: props.location.data.gender,
                nickname: props.location.data.nickname,
                profileImage: props.location.data.profileImage,
                role: props.location.data.role,
                jobs: props.location.data.jobs,
                companys: props.location.data.companys,
                topics: props.location.data.topics,
                schedules: state.schedules,
                progress: state.progress + state.progressRatio,
                progressRatio: state.progressRatio,
            }
        });
    }

    const handleBack = () => {
        props.history.replace({
            pathname: '/signup/mentor/topic',
            data: {
                email: props.location.data.email,
                age: props.location.data.age,
                gender: props.location.data.gender,
                nickname: props.location.data.nickname,
                profileImage: props.location.data.profileImage,
                role: props.location.data.role,
                jobs: props.location.data.jobs,
                companys: props.location.data.companys,
                topics: props.location.data.topics,
                progress: state.progress - state.progressRatio,
                progressRatio: state.progressRatio,
            }
        });
    }

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    }
    
    // Swipeable Modal Contents
    const container = drawerWindow !== undefined ? () => window.document.body : undefined;

    useEffect( () => {
        if (!state.initialized) { 
            if (props.location.data.schedules !== undefined) {   
                setState({
                    ...state,
                    initialized: true,
                    schedules: props.location.data.schedules,
                    progress: props.location.data.progress,
                    progressRatio: props.location.data.progressRatio,
                });
            } 
        } else {console.log('no prop data')}
    },[state, props]);

    return (
        <div>
        <Box sx={{
            pt: 1,
            pb: 1,
            margin: 2,
            maxWidth: 400,
            height: 50,
            display: 'flex',
        }}>
            <ButtonBase>
                <ArrowBackIosIcon color='disabled' onClick={handleBack} />
            </ButtonBase>
        </Box>
        <Box
            sx={{
                pt: 1,
                pb: 1,
                margin: 2,
                maxWidth: 400,
                overflow: 'auto',
                display: 'flex',
            }}
        >
            <Typography variant='h5' sx={{ fontWeight: 'fontWeightBold' }}>
                밥자리 희망 스케쥴을 등록해주세요
            </Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={state.progress}
                sx={{ color: red[300] }} />
        </Box>
        <Box sx={{ 
            pt: 2,
            p: 4,
            display: 'flex',
            margin: 2, 
            alignItems: 'center',
            maxWidth: 400,
        }}>
            <Typography variant='h6' sx={{ fontWeight: 'fontWeightMedium' }}>
                만남이 가능한 요일/시간 추가&nbsp;&nbsp;
            </Typography>
            <ButtonBase>
                <AddBoxIcon color='success' onClick={handleAdd}
                    sx={{width: 30, height: 30}}/>
            </ButtonBase>
        </Box>
        <Box sx={{ 
            display: 'flex',
            margin: 2,
            justifyContent: 'center', 
            alignItems: 'center',
            maxWidth: 400,
        }}>
            <Stack direction='column' spacing={3}>
                {state.schedules.map((schedule,index) => (
                        <Box sx={{
                            alignContents: 'center',
                            justifyContent: 'center',
                            }}
                        >
                            <Stack direction='row' spacing={2}>
                                <ButtonBase>
                                    <RemoveCircleIcon onClick={handleDelete(schedule)}
                                        sx={{width:30, height:30}}
                                        color='error'/>
                                </ButtonBase>
                                <Button variant='outlined' sx={{width: 250, height: 50}}
                                    onClick={handleSchedule(index)}>
                                    <Typography variant='subtitle1'
                                        sx={{ 
                                            color: 'black',
                                            fontWeight: 'fontWeightBold',
                                        }}
                                    >
                                        {schedule.day}요일&nbsp;&nbsp;
                                        {schedule.startTime}
                                        &nbsp;~&nbsp;
                                        {schedule.endTime}
                                    </Typography>
                                </Button>
                            </Stack>                   
                    </Box>
                ))}
            </Stack>
        </Box>
        <Box sx={{ 
            pt: 10,
            display: 'flex',
            margin: 2,
            justifyContent: 'center', 
            maxWidth: 400,
            overflow: 'auto',
        }}>
            <Button className={classes.root} disabled={state.schedules.length===0} onClick={handleNext} 
                sx={{justifyContent: 'center', width: 300}}
            >
                <Typography variant='h6'>
                    다 음
                </Typography>
            </Button>
        </Box>

        <Root>
                <CssBaseline />
                <Global
                    styles={{
                        '.MuiDrawer-root > .MuiPaper-root': {
                          height: '70%',
                          overflow: 'visible',
                        },
                        '.MuiDrawer-paper': {
                            borderTopLeftRadius: 24,
                            borderTopRightRadius: 24,
                        }
                    }}
                />
                <SwipeableDrawer
                    container={container}
                    anchor="bottom"
                    open={open}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                    swipeAreaWidth={drawerBleeding}
                    disableSwipeToOpen={true}
                    ModalProps={{
                        keepMounted: true,
                    }}
                > 
                    <Box
                        sx={{
                            pt: 5,
                            margin: 2,
                            maxWidth: 400,
                            overflow: 'auto',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Stack direction='row' spacing={1}>
                            {days.map((day,idx) => (
                                <Button variant={state.view[idx]}
                                    onClick={handleDay(idx)} sx={{minWidth: 40 ,maxWidth: 40}}>
                                    {day}
                                </Button>
                            ))}
                        </Stack>
                    </Box>

                    <Box
                        sx={{
                            pt: 2,
                            margin: 2,
                            maxWidth: 400,
                            minHeight: 100,
                            overflow: 'auto',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >

                        <Stack direction="row" spacing={2}>
                            <TextField
                                id="input-with-icon-textfield"
                                label='시작 시각'
                                type='time'
                                onChange={ev => 
                                    setState({...state,startTime:ev.target.value})}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    step: 300,
                                }}
                                variant="outlined"
                                defaultValue='00:00'
                                value={state.startTime}
                                sx={{minWidth: 150, maxWidth: 150}}
                            />
                            <TextField
                                id="input-with-icon-textfield"
                                label='종료 시각'
                                type='time'
                                onChange={ev => 
                                    setState({...state,endTime:ev.target.value})}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    step: 300,
                                }}
                                variant="outlined"
                                defaultValue='00:00'
                                value={state.endTime}
                                sx={{minWidth: 150, maxWidth: 150}}
                            />
                        </Stack>       
                    </Box>
                    <Box
                        sx={{
                            pt: 2,
                            margin: 2,
                            maxWidth: 400,
                            minHeight: 100,
                            overflow: 'auto',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {(state.day !== '' && state.startTime !== state.endTime
                         && state.startTime !== '' && state.endTime !== '')
                        ? <Button className={classes.root} onClick={handleDone} 
                            sx={{justifyContent: 'center'}}
                        >
                            <Typography variant='h6'>
                                완료
                            </Typography>
                        </Button> : null}
                    </Box>
                    <Dialog
                        open={dialogOpen}
                        onClose={handleDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {'경고'}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                중복된 스케쥴이 있습니다.
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </SwipeableDrawer>
            </Root>
        </div>
  );
}

const SignUpMentorSchedule = connect(mapStateToProps, mapDispatchToProps)(SignUpMentorScheduleComp);

export default SignUpMentorSchedule;