import React, { useState, useEffect } from 'react';
import { addSession, updateSession } from '../actions/index';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import { makeStyles } from '@mui/styles';
import Search from '@mui/icons-material/Search';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ButtonBase from '@mui/material/ButtonBase';
import LinearProgress from '@mui/material/LinearProgress';
import { red } from '@mui/material/colors';

const jobList = [
    '광고 기획자',
    '마케터',
    '해외영업',
    '서비스 기획',
    '클라우드 개발자',
    '반도체 연구원',
    '대학 교수',
    '치과 의사',
    '공무원',
];

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

const renderItem = ({ item, handleRemoveJob }) => {
    return (
        <Box sx={{ px: 6, mt: 2 }}>
            <Chip label={item} onDelete={() => handleRemoveJob(item)} />
        </Box>
    );
}


const SignUpMentorJobComp = (props) => {
    console.log(props);
    const classes = useStyles();

    const [state, setState] = useState({
        initialized: false,
        jobs: [],
        progress: 12.5,
        progressRatio: 12.5,
    });
    console.log(state)

    const handleRemoveJob = (item) => {
        setState({
            ...state,
            jobs: [...state.jobs.filter((i) => i !== item)]
        });
    };

    const handleAddJob = event => {
        let job;
        if (event.target.innerText &&
            state.jobs.indexOf(event.target.innerText) === -1) {
            job = event.target.innerText;
            console.log(job)
            setState({
                ...state,
                initialized: true,
                jobs: [...state.jobs, job],
            });
        } else if (event.target.value &&
            event.target.value.replace(/ /g,'').length > 0) {
            job = event.target.value;
            console.log(job)
            setState({
                ...state,
                initialized: true,
                jobs: [...state.jobs, job],
            });
        } 
    }

    const handleNext = event => {
        props.history.push({
            pathname: '/signup/mentor/company',
            data: {
                email: props.location.data.email,
                age: props.location.data.age,
                gender: props.location.data.gender,
                nickname: props.location.data.nickname,
                profileImage: props.location.data.profileImage,
                role: props.location.data.role,
                jobs: state.jobs,
                progress: state.progress + state.progressRatio,
                progressRatio: state.progressRatio,
            }
        })
    }

    const handleBack = () => {
        props.history.replace({
            pathname: '/signup/role',
            data: {
                email: props.location.data.email,
                age: props.location.data.age,
                gender: props.location.data.gender,
                nickname: props.location.data.nickname,
                profileImage: props.location.data.profileImage,
                role: props.location.data.role,
            }
        })
    }

    useEffect( () => {
        if (!state.initialized) { 
            if (props.location.data.jobs !== undefined) {
                setState({
                    initialized: true,
                    jobs: props.location.data.jobs,
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
        <Box sx={{
            pt: 1,
            pb: 1,
            px: 2,
            margin: 2,
            maxWidth: 400,
            display: 'flex',
        }}>
            <Typography variant='h5' sx={{ fontWeight: 'fontWeightBold' }}>
                직업명을 입력해주세요
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
            <Autocomplete
                id="jobSelect"
                options={jobList}
                freeSolo
                selectOnFocus
                clearOnBlur
                onChange={handleAddJob}
                renderInput={(params) => (
                    <Box sx={{
                        display: 'flex', 
                        alignItems: 'flex-end',
                    }}>
                        <Search sx={{ color: 'action.active', mr: 1, my: 0.5}} />
                        <TextField
                            {...params}
                            variant="standard"
                            size='small'
                            label="직업명 검색"
                            sx={{
                                width:250
                            }}
                        />
                    </Box>
                )}
            />
        </Box>
        <Box
            sx={{
                pt: 1,
                pb: 1,
                maxWidth: 400,
                overflow: 'auto',
            }}
        >
            <List>
                <TransitionGroup>
                    {state.jobs.map((item) => (
                        <Collapse key={item}>
                            {renderItem({ item, handleRemoveJob })}
                        </Collapse>
                    ))}
                </TransitionGroup>
            </List>
        </Box>
        <Box sx={{ 
            display: 'flex',
            margin: 2,
            justifyContent: 'center', 
            maxWidth: 400,
            overflow: 'auto',
        }}>
        {state.jobs.length > 0 ? <Button className={classes.root} onClick={handleNext} 
            sx={{justifyContent: 'center'}}
        >
            <Typography variant='h6'>
                다 음
            </Typography>
        </Button>
        : null}
        
        </Box>
        </div>
  );
}

const SignUpMentorJob = connect(mapStateToProps, mapDispatchToProps)(SignUpMentorJobComp);

export default SignUpMentorJob;