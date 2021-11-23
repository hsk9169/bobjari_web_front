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
import { red } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

const authMethod = [
    {
        title: '회사 메일로 인증하기',
        details: '메일이 있는 회사를 다니는 경우에 해당합니다.',
    },
    {
        title: '재직증명서로 인증하기',
        details: '메일이 없는 회사를 다니는 경우에 해당합니다.',
    },
    {
        title: '사업자등록증으로 인증하기',
        details: '개인사업자/프리랜서 등 근로계약자가 아닌 경우에 해당합니다.',
    },
    {
        title: '기타 증빙 파일로 인증하기',
        details: '위 세가지 방법으로 인증할 수 없는 경우에 해당합니다.',
    },
]


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
        authSelect: null,
        view: Array.from({length: authMethod.length}, () => 'outlined'),
        progress: props.location.data.progress,
        progressRatio: props.location.data.progressRatio,
    });
    console.log(state)

    const handleSelect = idx => () => {
        setState({
            ...state,
            authSelect: authMethod[idx].title,
            view: (state.view.map((element,index) => {
                if(index === idx) {
                    return 'contained'
                }
                else return 'outlined'
            }))
        })
    }

    const handleNext = event => {
        props.history.push({
            pathname: '/signup/mentor/fee',
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
                schedules: props.location.data.schedules,
                cafes: props.location.data.cafes,
                auth: state.authSelect,
                progress: state.progress + state.progressRatio,
                progressRatio: state.progressRatio,
            }
        })
    }

    const handleBack = event => {
        props.history.replace({
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
                schedules: props.location.data.schedules,
                cafes: props.location.data.cafes,
                progress: state.progress - state.progressRatio,
                progressRatio: state.progressRatio,
            }
        })
    }

    
    useEffect( () => {
        if (!state.initialized) {
            if (props.location.data.auth !== undefined) {
                setState({
                    initialized: true,
                    authSelect: props.location.data.auth,
                    view: (authMethod.map(el => {
                        if (el.title === props.location.data.auth) {
                            return 'contained';
                        } else {return 'outlined'}
                    })),
                    progress: props.location.data.progress,
                    progressRatio: props.location.data.progressRatio,
                });
            }
        } else {console.log('no prop data')}

    },[state, props]);


    // Kakao Map
    

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
                직업을 인증해주세요
            </Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={state.progress}
                sx={{ color: red[300] }} />
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
                {authMethod.map((el,idx) => (
                    <Button variant={state.view[idx]} onClick={handleSelect(idx)}>
                        <Grid container direction='column'>
                        <Typography variant='subtitle1' 
                            color={state.view[idx]==='contained' ? 'white' : 'black'}
                            sx={{fontWeight: 'fontWeightBold'}}>
                            {el.title}
                        </Typography>
                        <Typography variant='caption text'
                            color={state.view[idx]==='contained' ? 'white' : 'black'}
                            sx={{fontWeight: 'fontWeightMedium'}}>
                            {el.details}
                        </Typography>
                        </Grid>
                    </Button>
                ))}
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
            <Button className={classes.root} disabled={state.authSelect===null} onClick={handleNext} 
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


