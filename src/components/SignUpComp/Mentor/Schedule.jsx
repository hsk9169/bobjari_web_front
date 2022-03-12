import * as React from 'react'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import AddBoxIcon from '@mui/icons-material/AddBoxOutlined';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import PageBox from '../../styled/PageBox'
import BobButton from '../../styled/BobButton'
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import {days} from 'constants/days'


const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const Schedule = (props) => {

    const progressRatio = 10
    const drawerBleeding = 56;

    const [temp, setTemp] = React.useState({
        current: null,
        day: '',
        startTime: '',
        endTime: '',
        view: Array.from({length: days.length}, () => 'outlined'),
    })

    // Drawer
    const { drawerWindow } = props;
    const [open, setOpen] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);


    const handleAddButton = () => {
        setTemp({
            current: null,
            day: '',
            startTime: '',
            endTime: '',
            view: temp.view.map(() => {return 'outlined'}),
        })
        setOpen(true);
    }

    const handleSelectSchedule = idx => () => {
        setTemp({
            ...temp,
            current: idx,
            day: props.state.schedules[idx].day,
            startTime: props.state.schedules[idx].startTime,
            endTime: props.state.schedules[idx].endTime,
            view: (days.map(el => {
                if (el === props.state.schedules[idx].day) {
                    return 'contained';
                } else {
                    return 'outlined';
                }
            }))
        });
        setOpen(true);        
    }

    const handleDeleteSchedule = (index) => () => {
        console.log('delete')
        props.setState({
            ...props.state,
            schedules: [...props.state.schedules.filter((el,idx) =>
                idx !== index)],
            schedList: [...props.state.schedList.filter((el,idx) =>
                idx !== index)],
        })
        setOpen(false)
    }

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleNext = () => {
        props.setState({
            ...props.state,
            pageNum: (props.state.pageNum < 10
                ? props.state.pageNum+1 
                : props.state.pageNum),
            progress: (props.state.progress < 100 
                ? props.state.progress+progressRatio 
                : props.state.progress),
        })
    }

    // Drawer Actions
    const handleDay = idx => event => {
        setTemp({
            ...temp,
            day: event.target.innerText,
            view: (temp.view.map((element,index) => {
                if(index === idx) {
                    return 'contained'
                }
                else return 'outlined'
            }))
        })
    }

    const handleDone = event => {
        // check duplicated schedule in list
        const check = props.state.schedules.filter(el => 
            (el.day === temp.day &&
            el.startTime === temp.startTime &&
            el.endTime === temp.endTime));
        console.log('duplicate',check)
        if (check.length === 0) {
            const schedule = {
                day: temp.day,
                startTime: temp.startTime,
                endTime: temp.endTime,
            };
            // check if it's editting process
            if (temp.current !== null) {
                props.setState({
                    ...props.state,
                    schedules: [...props.state.schedules.map((el,idx) => {
                        if (idx === temp.current) {
                            return schedule;
                        } else {
                            return el;
                        }
                    })],
                    schedList: [...props.state.schedList.map((el,idx) => {
                        if (idx === temp.current) {
                            return {
                                title: temp.day+'요일',
                                detail: temp.startTime+' ~ '+temp.endTime,
                            }
                        } else {
                            return el;
                        }
                    })],
                })
            } else {
                props.setState({
                    ...props.state,
                    schedules: [...props.state.schedules, schedule],
                    schedList: [...props.state.schedList, {
                        title: temp.day+'요일',
                        detail: temp.startTime+' ~ '+temp.endTime,
                    }],
                });
            }
            setOpen(false);
        } else {
            setDialogOpen(true);
        }        
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
    }

    // Swipeable Modal Contents
    const container = drawerWindow !== undefined 
        ? () => window.document.body 
        : undefined;

    return (
        <>
        <Grid item container
            direction='column'
            sx={{
                width: '100%',
                display: 'flex', 
                p: 2,
            }}
        >
            <Grid item
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                }}
            >
                <ButtonBase>
                    <AddBoxIcon 
                        onClick={handleAddButton}
                        sx={{
                            color:'text.secondary', 
                            width: 50, 
                            height: 50
                        }}
                    />
                </ButtonBase>                
            </Grid>
                
 
            <Grid item container 
                sx={{
                    width: '100%',
                    p:3,
                    display:'flex',
                    justifyContent: 'center'
                }}
            >
                <TransitionGroup >
                    {props.state.schedList.map((el,idx) => (
                        <Collapse key={idx}>
                            <Stack direction='row' spacing={2}>
                                <Button variant='outlined' 
                                    endIcon={
                                        <DeleteIcon
                                            onClick={handleDeleteSchedule(idx)}
                                            color='error'
                                        />
                                    } 
                                    startIcon={
                                        <EditIcon
                                            onClick={handleSelectSchedule(idx)}
                                            color='success'
                                        />
                                    }
                                    sx={{width: '100%', height: 60}}
                                >
                                    <Grid container direction='column' spacing={0}>
                                        <Grid item>
                                            <Typography variant='subtitle1'
                                                sx={{ 
                                                    color: 'black',
                                                    fontWeight: 'fontWeightBold',
                                                }}
                                            >
                                                {el.title}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant='subtitle1'
                                                sx={{ 
                                                    color: 'black',
                                                    fontWeight: 'fontWeightMedium',
                                                }}
                                            >
                                                {el.detail}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Button>
                            </Stack>       
                        </Collapse>
                    ))}
                </TransitionGroup>
            </Grid>

            <Grid item 
                sx={{
                    width: '100%',
                    pt: 4
                }}
            >
                <BobButton 
                    onClick={handleNext}
                    disabled={false}
                    title={'다 음'}
                />
            </Grid>
        </Grid>


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
                    <PageBox
                        sx={{
                            pb: 5,
                            pt: 5,
                            overflow: 'auto',
                            display: 'flex',
                        }}
                    >
                        <Stack direction='row' spacing={1}>
                            {days.map((day,idx) => (
                                <Button key={day} variant={temp.view[idx]}
                                    onClick={handleDay(idx)} sx={{minWidth: 40 ,maxWidth: 40}}>
                                    {day}
                                </Button>
                            ))}
                        </Stack>
                    </PageBox>

                    <PageBox
                        sx={{
                            pt: 2,
                            minHeight: 100,
                            overflow: 'auto',
                            display: 'flex',
                        }}
                    >

                        <Stack direction="row" spacing={2}>
                            <TextField
                                id="input-with-icon-textfield"
                                label='시작 시각'
                                type='time'
                                onChange={ev => 
                                    setTemp({...temp, startTime:ev.target.value})}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    step: 300,
                                }}
                                variant="outlined"
                                value={temp.startTime}
                                sx={{minWidth: 150, maxWidth: 150}}
                            />
                            <TextField
                                id="input-with-icon-textfield"
                                label='종료 시각'
                                type='time'
                                onChange={ev => 
                                    setTemp({...temp, endTime:ev.target.value})}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    step: 300,
                                }}
                                variant="outlined"
                                value={temp.endTime}
                                sx={{minWidth: 150, maxWidth: 150}}
                            />
                        </Stack>       
                    </PageBox>
                    <PageBox
                        sx={{
                            pt: 4,
                            minHeight: 100,
                            overflow: 'auto',
                            display: 'flex',
                        }}
                    >
                        {(temp.day !== '' && 
                          temp.startTime !== temp.endTime &&
                          temp.startTime !== '' && 
                          temp.endTime !== '')
                        ? <BobButton title='완 료' onClick={handleDone}/>
                        : null}
                    </PageBox>
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
        </>
    )
}

export default Schedule;