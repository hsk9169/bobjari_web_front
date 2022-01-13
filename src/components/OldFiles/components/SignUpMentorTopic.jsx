import React, { useState, useEffect } from 'react';
import { addSession } from '../actions/index';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ButtonBase from '@mui/material/ButtonBase';
import LinearProgress from '@mui/material/LinearProgress';
import { red } from '@mui/material/colors';


const topicList = [
    '직업 이점',
    '직업 고충',
    '하루 일과',
    '직업선택 이유',
    '자소서/면접',
    '회사 정보',
    '커리어 계획',
    '직업 비전',
    '마인드셋',
    '라이프 스타일',
];

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


const SignUpMentorTopicComp = (props) => {
    
    const classes = useStyles();

    const [state, setState] = useState({
        initialized: false,
        topics: [],
        view: Array.from({length: topicList.length}, () => 'outlined'),
        progress: props.location.data.progress,
        progressRatio: props.location.data.progressRatio,
    })

    console.log(state)

    const handleTopic = idx => event => {
        console.log(state.topics.filter(el => el===topicList[idx]))
        if (state.topics.filter(el => el===topicList[idx]).length > 0) {
            console.log('del')
            setState({
                ...state,
                topics: state.topics.filter(el => el!==topicList[idx]),
                view: (state.view.map((element,index) => {
                    if(index === idx) {
                        return 'outlined';
                    } else {
                        return element;
                    }
                }))
            });
        } else {
            console.log('add')
            setState({
                ...state,
                topics: [...state.topics, topicList[idx]],
                view: (state.view.map((element,index) => {
                    if(index === idx) {
                        return 'contained';
                    } else {
                        return element;
                    }
                }))
            });
        };
    }

    const handleNext = event => {
        props.history.push({
            pathname: '/signup/mentor/schedule',
            data: {
                email: props.location.data.email,
                age: props.location.data.age,
                gender: props.location.data.gender,
                nickname: props.location.data.nickname,
                profileImage: props.location.data.profileImage,
                role: props.location.data.role,
                job: props.location.data.job,
                company: props.location.data.company,
                topics: state.topics,
                progress: state.progress + state.progressRatio,
                progressRatio: state.progressRatio,
            }
        });
    }

    const handleBack = () => {
        props.history.replace({
            pathname: '/signup/mentor/company',
            data: {
                email: props.location.data.email,
                age: props.location.data.age,
                gender: props.location.data.gender,
                nickname: props.location.data.nickname,
                profileImage: props.location.data.profileImage,
                role: props.location.data.role,
                job: props.location.data.job,
                company: props.location.data.company,
                progress: state.progress - state.progressRatio,
                progressRatio: state.progressRatio,
            }
        });
    }

    useEffect( () => {
        if (!state.initialized) { 
            if (props.location.data.topics !== undefined) {   
                setState({
                    initialized: true,
                    topics: props.location.data.topics,
                    view: (topicList.map(el => {
                        if(props.location.data.topics.filter(topic => topic===el).length > 0) {
                            return 'contained';
                        } else {
                            return 'outlined';
                        }
                    })),
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
                나눌 수 있는 이야기를 선택해주세요
            </Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={state.progress}
                sx={{ color: red[300] }} />
        </Box>
        <Box
            sx={{
                pt: 2,
                pb: 2,
                margin: 2,
                maxWidth: 400,
                overflow: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: 1
            }}
        >
            <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 4, md: 6 }}>
                {topicList.map((el,idx) => (
                    <Grid item xs={6} key={idx}>
                            <Button variant={state.view[idx]} onClick={handleTopic(idx)}
                                sx={{minWidth:160, maxWidth:160,
                                    minHeight:80, maxHeigth:80,
                                    textAlign: 'center'}}
                            >
                                <Typography variant='subtitle1' 
                                    color={state.view[idx]==='contained' ? 'white' : 'black'}
                                    sx={{fontWeight: 'fontWeightBold'}}>
                                    {el}
                                </Typography>
                            </Button>
                    </Grid>
                ))}
            </Grid>
            
        </Box>
        <Box sx={{ 
            display: 'flex',
            margin: 2,
            justifyContent: 'center', 
            maxWidth: 400,
            overflow: 'auto',
        }}>
            <Button className={classes.root} disabled={state.topics.length===0} onClick={handleNext} 
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

const SignUpMentorTopic = connect(mapStateToProps, mapDispatchToProps)(SignUpMentorTopicComp);

export default SignUpMentorTopic;