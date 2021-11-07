import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const SignUpRole= (props) => {

    const [ state, setState ] = useState({
        menteeDisplay: 'outlined',
        mentorDisplay: 'outlined',
        role: '',
    });

    console.log(props.location.data);

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
                pathname: '/signup/career',
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

    return (
        <Box component='div'
            sx={{
                px: 2,
                pb: 10,
                margin: 2,
                maxWidth: 400,
                overflow: 'auto',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    pt: 4,
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
                        <Typography variant='h5' sx={{ fontWeight: 'fontWeigntMedium' }}>
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
                        <Typography variant='h5' sx={{ fontWeight: 'fontWeigntMedium' }}>
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

export default SignUpRole;