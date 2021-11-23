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
import TextField from '@mui/material/TextField';
import { EmojiProvider, Emoji } from 'react-apple-emojis';
import emojiData from 'react-apple-emojis/lib/data.json';


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


const SignUpMentorIntroduceComp = (props) => {
    
    const classes = useStyles();

    const [state, setState] = useState({
        introduce: null,
        progress: props.location.data.progress,
        progressRatio: props.location.data.progressRatio,
    });

    const handleText = event => {
        setState({
            ...state,
            introduce: event.target.value,
        })
    }

    const handleJoin = event => {
        props.history.push({
            pathname: '/signup/mentor/congratulation',
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
                auth: props.location.data.auth,
                fee: props.location.data.fee,
                introduce: state.introduce,
            }
        })
    }

    const handleBack = event => {
        props.history.replace({
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
                auth: props.location.data.auth,
                fee: props.location.data.fee,
                progress: state.progress - state.progressRatio,
                progressRatio: state.progressRatio,
            }
        })
    }

    


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
                자기소개를 작성해주세요
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
                    프로페셔널한 당신을 소개할수록
                </Typography>
                <Typography variant='subtitle' sx={{ fontWeight: 'fontWeightMedium' }}>
                    성공적인 밥자리에 더욱 가까워집니다.
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
            <TextField multiline rows={5} label='자기소개' defaultValue='멋진 소개로 시작해보세요 :)'
                variant='outlined' onChange={handleText} sx={{width: 300, height: 200}}>
            </TextField>
        </Box>
        
        <Box sx={{ 
            display: 'flex',
            pt: 10,
            margin: 2,
            justifyContent: 'center', 
            maxWidth: 400,
            overflow: 'auto',
        }}>
            <Button className={classes.root} disabled={state.feeSelect===null} onClick={handleJoin} 
                sx={{justifyContent: 'center'}}
            >
                <Typography variant='h6'>
                    직업인 등록 완료&nbsp;
                </Typography>
                    <EmojiProvider data={emojiData}>
                        <Emoji name="party-popper" width={25} />
                    </EmojiProvider>
            </Button>
        </Box>

        
        
        
    </div>
  );
}

const SignUpMentorIntroduce = connect(mapStateToProps, mapDispatchToProps)(SignUpMentorIntroduceComp);

export default SignUpMentorIntroduce;


