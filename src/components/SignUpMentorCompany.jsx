import React, { useState, useEffect } from 'react';
import { addSession } from '../actions/index';
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


const companyList = [
    '이노션',
    '네이버',
    '카카오',
    '국민은행',
    '서울메트로',
    'CJ E&M',
    '스타벅스',
    '쿠팡',
    '연세 세브란스',
];

const mapDispatchToProps = dispatch => {
    return {
        addSession: session => dispatch(addSession(session)),
    };
};

const mapStateToProps = state => {
    return {
        api: state.api,
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


const SignUpMentorCompanyComp = (props) => {
    console.log(props);
    const classes = useStyles();

    const [state, setState] = useState({
        initialized: false,
        companys: [],
        progress: props.location.data.progress,
        progressRatio: props.location.data.progressRatio,
    })
    console.log(state)

    const handleRemoveJob = (item) => {
        setState({
            ...state, 
            companys: [...state.companys.filter((i) => i !== item)]
        })
    };

    const handleAddJob = event => {
        let company;
        if (event.target.innerText &&
            state.companys.indexOf(event.target.innerText) === -1) {
            company = event.target.innerText;
            console.log(company)
            setState({
                ...state,
                initialized: true,
                companys: [...state.companys, company],
            });
        } else if (event.target.value &&
            event.target.value.replace(/ /g,'').length > 0) {
            company = event.target.value;
            setState({
                ...state,
                initialized: true,
                companys: [...state.companys, company],
            });
        } 
    }

    const handleNext = event => {
        props.history.push({
            pathname: '/signup/mentor/topic',
            data: {
                email: props.location.data.email,
                age: props.location.data.age,
                gender: props.location.data.gender,
                nickname: props.location.data.nickname,
                profileImage: props.location.data.profileImage,
                role: props.location.data.role,
                jobs: props.location.data.jobs,
                companys: state.companys,
                progress: state.progress + state.progressRatio,
                progressRatio: state.progressRatio,
            }
            
        })
    }

    const handleBack = event => {
        props.history.replace({
            pathname: '/signup/mentor/job',
            data: {
                email: props.location.data.email,
                age: props.location.data.age,
                gender: props.location.data.gender,
                nickname: props.location.data.nickname,
                profileImage: props.location.data.profileImage,
                role: props.location.data.role,
                jobs: props.location.data.jobs,
                progress: state.progress - state.progressRatio,
                progressRatio: state.progressRatio,
            }
        });
    }

    useEffect( () => {
        if (!state.initialized) { 
            if (props.location.data.companys !== undefined) {
                if (props.location.data.companys) { 
                    setState({
                        initialized: true,
                        companys: props.location.data.companys,
                        progress: props.location.data.progress,
                        progressRatio: props.location.data.progressRatio,
                    });
                }
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
                회사명을 입력해주세요
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
                id="companySelect"
                options={companyList}
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
                            label="회사명 검색"
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
                    {state.companys.map((item) => (
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
        {state.companys.length > 0 ? <Button className={classes.root} onClick={handleNext} 
            sx={{justifyContent: 'center'}}
        >
            <Typography variant='h6'>
                다 음
            </Typography>
        </Button>
        : null }

        </Box>
        </div>
  );
}

const SignUpMentorCompany = connect(mapStateToProps, mapDispatchToProps)(SignUpMentorCompanyComp);

export default SignUpMentorCompany;