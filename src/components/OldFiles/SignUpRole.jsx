import React, { useState, useEffect } from 'react';
import { addSession, updateSession } from '../actions/index';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ButtonBase from '@mui/material/ButtonBase';


const mapDispatchToProps = dispatch => {
    return {
        addSession: session => dispatch(addSession(session)),
        updateSession: session => dispatch(updateSession(session)),
    };
};

const mapStateToProps = state => {
    return {
        session: state.session,
    };
};

const SignUpRoleComp = (props) => {

    const [ state, setState ] = useState({
        menteeDisplay: 'outlined',
        mentorDisplay: 'outlined',
        role: '',
        initialized: false,
    });
    console.log(state)

    const handleNext = async (event) => {
        event.preventDefault();
        if (state.role === 'mentee') {
            props.history.push({
                pathname: '/signup/interest',
                data: {
                    email: props.location.data.email,
                    age: props.location.data.age,
                    gender: props.location.data.gender,
                    nickname: props.location.data.nickname,
                    profileImage: props.location.data.profileImage,
                    role: state.role,
                }
            });      
        } else if (state.role === 'mentor') {
            props.history.push({
                pathname: '/signup/mentor/job',
                data: {
                    email: props.location.data.email,
                    age: props.location.data.age,
                    gender: props.location.data.gender,
                    nickname: props.location.data.nickname,
                    profileImage: props.location.data.profileImage,
                    role: state.role,
                }
            });      
        };
    };  

    const handleBack = () => {
        props.history.replace({
            pathname: '/signup/form',
            data: {
                email: props.location.data.email,
                age: props.location.data.age,
                gender: props.location.data.gender,
                nickname: props.location.data.nickname,
                profileImage: props.location.data.profileImage,
            }
        });
    };
    
    const handleMenteeDisplay = async () => {
        setState({
            ...state,
            menteeDisplay: 'contained',
            mentorDisplay: 'outlined',
            role: 'mentee'
        });
    }

    const handleMentorDisplay = async () => {
        setState({
            ...state,
            menteeDisplay: 'outlined',
            mentorDisplay: 'contained',
            role: 'mentor'
        });
    }

    useEffect( () => {
        if (!state.initialized) {
            if (props.location.data.role !== undefined) {
                setState({
                    ...state,
                    role: props.location.data.role,
                    initialized: true,
                    menteeDisplay: (props.location.data.role==='mentee' ?
                        'contained' : 'outlined'),
                    mentorDisplay: (props.location.data.role==='mentor' ?
                        'contained' : 'outlined'),
                })
            }
        } else {console.log('no prop data')}
    },[state, props]);

    return (
        <Box component='div'
            sx={{
                px: 2,
                margin: 2,
                maxWidth: 400,
                overflow: 'auto',
                justifyContent: 'center',
            }}
        >
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
                    pb: 4,
                    margin: 2,
                    maxWidth: 400,
                    overflow: 'auto',
                }}
            >
                <Stack direction='column' spacing={2}>
                    <Typography variant='h5' sx={{ fontWeight: 'fontWeigntMedium' }}>
                        회원가입 완료!
                    </Typography>
                    <Typography variant='subtitle1'>
                        원하시는 활동을 선택해주세요 :)
                    </Typography>
                </Stack>
            </Box>
            <Box
                sx={{
                    px: 1,
                    pt: 4,
                    pb: 10,
                    maxWidth: 400,
                    overflow: 'auto',
                    justifyContent: 'center'
                }}
            >
                <Stack direction='row' spacing={4}>
                    <Button variant={state.menteeDisplay} onClick={handleMenteeDisplay}
                        sx={{
                            maxWidth: 130, 
                            maxHeight: 200,
                            minWidth: 130,
                            minHeight: 200,
                        }}
                    >
                        <Typography variant='h5' sx={{ fontWeight: 'fontWeightMedium' }}>
                            예비<br/>직업인
                        </Typography>
                    </Button>
                    <Button variant={state.mentorDisplay} onClick={handleMentorDisplay}
                        sx={{
                            maxWidth: 130, 
                            maxHeight: 200,
                            minWidth: 130,
                            minHeight: 200,
                        }}
                    >
                        <Typography variant='h5' sx={{ fontWeight: 'fontWeightMedium' }}>
                            직업인
                        </Typography>
                    </Button>
                </Stack>
            </Box>
            <Box component='div'
                sx={{
                    justifyContent: 'flex-end',
                    display: 'flex'
                }}>
                <Button variant='contained' onClick={handleNext} 
                    sx={{ alignItems: 'center' }}>
                        <Typography variant='h6'>
                            다음
                        </Typography>
                </Button>
            </Box>
                
        </Box>
    );
}

const SignUpRole = connect(mapStateToProps, mapDispatchToProps)(SignUpRoleComp);

export default SignUpRole;