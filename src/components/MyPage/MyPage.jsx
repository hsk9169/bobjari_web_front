import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import PageBox from 'components/styled/PageBox'

import MentorProfileCard from './Mentor/ProfileCard';
import MentorProfileInfo from './Mentor/ProfileInfo';
import MentorControlEtc from './Mentor/ControlEtc';

import MenteeProfileCard from './Mentee/ProfileCard';
import MenteeProfileInfo from './Mentee/ProfileInfo';
import MenteeControlEtc from './Mentee/ControlEtc';



export default function MyPageMentor() {

    const [state, setState] = React.useState({
        imgUrl: 'https://w.namu.la/s/28027c57126faed6ad2426677a122ac53864e9fca93d64442af454a4bb397c3ac6467f258f151f0bb19b3c8b91609ae7cc8ab888a9b235670622ef1cb1fbc6df56bfd6011ccdef1401fb8ce52739c8e9fc85a22f858fdfd891e8b8522d4647c4',
        nickname: '꿈나무개발자',
        career: '서버 개발자',
        company: '밥자리',
        isMentor: false,
        interests: ['서버 개발자', '백엔드 개발자'],
        roleButtonText: '직업인으로 전환'
    });

    const handleRole = () => {
        setState({
            ...state,
            isMentor: !state.isMentor,
            roleButtonText: (state.isMentor ? '직업인으로 전환' : '예비직업인으로 전환'),
        })
    }

    return (
        <PageBox>
            {state.isMentor
                ? <MentorProfileCard state={state} setState={setState} />
                : <MenteeProfileCard state={state} setState={setState} />
            }
            <Divider variant="fullWidth" />
            {state.isMentor
                ? <MentorProfileInfo state={state} setState={setState} />
                : <MenteeProfileInfo state={state} setState={setState} />
            }
            <Divider variant="fullWidth" />
            <Box component='div'
                sx={{
                    pt:2,
                    margin: 2,
                    maxWidth: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Button variant='outlined'
                    onClick={handleRole}
                    sx={{
                        minWidth: '100%',
                        borderRadius: 2
                    }}>
                    <Typography variant='h6' 
                        sx={{
                            fontWeight: 'fontWeightBold',    
                        }}
                    >
                        {state.roleButtonText}
                    </Typography>
                </Button>
            </Box>
            {state.isMentor
                ? <MentorControlEtc state={state} setState={setState} />
                : <MenteeControlEtc state={state} setState={setState} />
            }
        </PageBox>
    
  );
}