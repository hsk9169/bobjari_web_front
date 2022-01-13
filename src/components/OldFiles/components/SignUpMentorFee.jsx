import React, { useState, useEffect, useRef } from 'react';
import { addSession } from '../actions/index';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ButtonBase from '@mui/material/ButtonBase';
import LinearProgress from '@mui/material/LinearProgress';
import { red,  } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';


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
        width: 300,
        padding: '0 30px',
    },
});


const SignUpMentorAuthComp = (props) => {
    
    const classes = useStyles();

    const [state, setState] = useState({
        initialized: false,
        fee: {
            select: null,
            value: 0,
        },
        feeView: 0,
        progress: props.location.data.progress,
        progressRatio: props.location.data.progressRatio,
    });
    console.log(state)

    const handleSelect = feeSel => () => {
        setState({
            ...state,
            fee: {
                select: false,
                value: (!feeSel ? 0 : state.feeView),
            },
            feeSelect: feeSel,
        })
    }

    const handleFee = event => {
        setState({
            ...state,
            fee: {
                select: true,
                value: event.target.value,
            },
            feeView: event.target.value,
        })
    }

    const handleNext = event => {
        props.history.push({
            pathname: '/signup/mentor/introduce',
            data: {
                email: props.location.data.email,
                age: props.location.data.age,
                gender: props.location.data.gender,
                nickname: props.location.data.nickname,
                profileImage: props.location.data.profileImage,
                role: props.location.data.role,
                job: props.location.data.job,
                company: props.location.data.company,
                topics: props.location.data.topics,
                schedules: props.location.data.schedules,
                cafes: props.location.data.cafes,
                auth: props.location.data.auth,
                fee: state.fee,
                progress: state.progress + state.progressRatio,
                progressRatio: state.progressRatio,
            }
        })
    }

    const handleBack = event => {
        props.history.replace({
            pathname: '/signup/mentor/auth',
            data: {
                email: props.location.data.email,
                age: props.location.data.age,
                gender: props.location.data.gender,
                nickname: props.location.data.nickname,
                profileImage: props.location.data.profileImage,
                role: props.location.data.role,
                job: props.location.data.job,
                company: props.location.data.company,
                topics: props.location.data.topics,
                schedules: props.location.data.schedules,
                cafes: props.location.data.cafes,
                auth: props.location.data.auth,
                progress: state.progress - state.progressRatio,
                progressRatio: state.progressRatio,
            }
        })
    }

    
    useEffect( () => {
        if (!state.initialized) {
            if (props.location.data.fee !== undefined) {
                setState({
                    initialized: true,
                    fee: props.location.data.fee,
                    progress: props.location.data.progress,
                    progressRatio: props.location.data.progressRatio,
                });
            }
        } else {console.log('no prop data')}

    },[state, props]);


    return (
        <div className='parent'>
            
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
                희망 감사비를 설정해주세요
            </Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={state.progress}
                sx={{ color: red[300] }} />
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
            <Stack direction='column'>
                <Typography variant='subtitle' sx={{ fontWeight: 'fontWeightMedium' }}>
                    감사비란, 예비직업인이 직업인에게
                </Typography>
                <Typography variant='subtitle' sx={{ fontWeight: 'fontWeightMedium' }}>
                    지불하는 보상입니다.
                </Typography>
            </Stack>
        </Box>
        <Box
            sx={{
                pt: 4,
                margin: 2,
                maxWidth: 400,
                overflow: 'auto',
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <Stack direction='column' spacing={2}>
                <Button variant={state.fee.select===false ? 'contained' : 'outlined'} 
                    onClick={handleSelect(false)} 
                    sx={{width: 300, height:60}}>
                    <Typography variant='subtitle1' 
                        color={state.fee.select===false ? 'white' : 'black'}
                        sx={{fontWeight: 'fontWeightBold'}}>
                        식사 / 차 대접으로 충분해요!
                    </Typography>
                </Button>
                <Button variant={state.fee.select ? 'contained' : 'outlined'} 
                    onClick={handleSelect(true)} 
                    sx={{width: 300, height:60}}>
                    <Input defaultValue={state.feeView}
                        onChange={handleFee}
                        sx={{width: 80, alignItem:'center',
                        color: (state.fee.select ? 'white' : 'black')}} 
                    />
                    <Typography variant='subtitle1' 
                        color={state.fee.select ? 'white' : 'black'}
                        sx={{fontWeight: 'fontWeightBold'}}>
                        원 / 1시간
                    </Typography>
                </Button>
            </Stack>
        </Box>
        
        <Box sx={{ 
            display: 'flex',
            pt: 10,
            margin: 2,
            justifyContent: 'center', 
            maxWidth: 400,
            overflow: 'auto',
        }}>
            <Button className={classes.root} disabled={state.feeSelect===null} onClick={handleNext} 
                sx={{justifyContent: 'center'}}
            >
                <Typography variant='h6'>
                    다 음
                </Typography>
            </Button>
        </Box>

        
        
        
    </div>
  );
}

const SignUpMentorAuth = connect(mapStateToProps, mapDispatchToProps)(SignUpMentorAuthComp);

export default SignUpMentorAuth;


