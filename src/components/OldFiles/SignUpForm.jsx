import React, { useState, useEffect } from 'react';
import { addSession } from '../actions/index';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import createNickname from '../utils/create-nickname';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { EmojiProvider, Emoji } from 'react-apple-emojis'
import emojiData from 'react-apple-emojis/lib/data.json'
const imageUri = require('../constants/image-uri');
const axios = require('axios');

const mapDispatchToProps = dispatch => {
    return {
        addSession: session => dispatch(addSession(session)),
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

const SignUpFormComp = (props) => {
    console.log(props)

    const classes = useStyles();

    const initialNickname = createNickname();
    const [ state, setState ] = useState({
        initialized: false,
        email: props.location.data.email,
        age: '',
        gender: '',
        nickname: initialNickname,
        nicknameCheck: null,
        profileImage: '',
        profileImageType: 'url',
        errMsg: '',
    });
    const [selectedFile, setSelectedFile] = useState({
        file: null,
        previewUrl: '',
        selectUrl: '',
    });

    console.log(state);

    const checkBeforeSubmit = () => {
        if (state.nicknameCheck &&
            state.age &&
            state.gender &&
            state.profileImage) return true;
        else return false;
    };

    const handleNicknameInput = (event) => {
        setState({
            ...state,
            [event.target.id]: event.target.value,
            isDuplicated: false,
        })
    };
    
    const handleAgeInput = (event) => {
        setState({
            ...state, 
            [event.target.id]: event.target.value,
        })
    };

    const handleGenderSelect = (event) => {
        setState({
            ...state,
            gender: event.target.value,
        })
    };

    const handleCheckDuplicate = async (event) => {
        event.preventDefault();
        let ret;
        await axios({
            method: 'POST',
            url: process.env.REACT_APP_API_CHECK_NICKNAME,
            data: {
                nickname: state.nickname,
            }})
            .then(res => {
                ret = res.data;
            })
            .catch(err => {
                console.log(err);
            });
        setState({
            ...state,
            nicknameCheck: (ret === 'available' ? true : false),
        });
    };

    const handleNicknameRefresh = (event) => {
        event.preventDefault();
        const recommend = createNickname();
        setState({
            ...state, 
            nickname: recommend,
        });
    };

    const handleProfileImageSelect = (event) => {
        event.preventDefault();
        const prefix = event.target.value.slice(0,4);
        let fileType = 'url';
        if (selectedFile.file !== null) {
            fileType = selectedFile.file.type;
        }

        setState({
            ...state,
            profileImage: event.target.value,
            profileImageType: prefix === 'http' ? 'url' : fileType,
        });
        setSelectedFile({
            ...selectedFile,
            previewUrl: event.target.value,
        })
    };

    const handleJoin = async (event) => {
        event.preventDefault();
        const ret = checkBeforeSubmit();
        let msg = '';
        if (ret) {
            msg = '';
            let img;
            if (selectedFile.file === null) {
                img = state.profileImage;
            } else {
                img = selectedFile.file;
            }
            props.history.push({
                pathname: '/signup/role',
                data: {
                    email: state.email,
                    age: state.age,
                    gender: state.gender,
                    nickname: state.nickname,
                    profileImage: {
                        data: img,
                        contentType: state.profileImageType,
                    }
                }         
            });
        } else {
            if (!state.nicknameCheck) msg += '닉네임 ';
            if (!state.age) msg += '나이 ';
            if (!state.gender) msg += '성별 ';
            if (!state.profileImg) msg += '프로필 이미지 ';
            msg += '다시 확인해주세요';
        }
        setState({
            ...state,
            errMsg: msg,
        });
    };
 
    const handleFileInput = (event) => {
        event.preventDefault();
        let file = event.target.files[0];
        let reader = new FileReader();

        reader.onloadend = () => {
            setSelectedFile({
                file: file,
                selectUrl: reader.result,
                previewUrl: reader.result,
            });
        }
        try {
            reader.readAsDataURL(file);
        } catch {}
        
    }

    useEffect( () => {
        if (!state.initialized) {
            if (props.location.data.age !== undefined &&
                props.location.data.gender !== undefined &&
                props.location.data.nickname !== undefined &&
                props.location.data.profileImage !== undefined) {
                setState({
                    ...state,
                    email : props.location.data.email,
                    age: props.location.data.age,
                    gender: props.location.data.gender,
                    nickname: props.location.data.nickname,
                    nicknameCheck: true,
                    profileImage: props.location.data.profileImage.data,
                    profileImageType: props.location.data.profileImage.contentType,
                    initialized: true,
                })
            }
        } else {console.log('no prop data')}
    },[state, props]);

    return (
        <Box 
            sx={{
                px: 2,
                pb: 10,
                margin: 2,
                maxWidth: 400,
                overflow: 'auto',
            }}
        >
        
            <Stack direction='column' spacing={2}>
                <Typography variant='h5' sx={{ fontWeight: 'fontWeigntMedium' }}>
                    닉네임
                </Typography>
                <Typography variant='subtitle1'>
                    성공적인 밥자리를 위해<br/>개성 넘치는 이름을 설정해주세요
                </Typography>
                <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                    <TextField error={!state.nicknameCheck} id='nickname' value={state.nickname} 
                                helperText={(state.nicknameCheck === null) ? '중복확인 해주세요'
                                           :(!state.nicknameCheck) ? '닉네임 중복입니다' : '사용 가능합니다'}
                                onChange={handleNicknameInput}>
                    </TextField>
                
                <Stack direction='row' spacing={1}>
                    {(state.nickname.length > 3) ? <Button variant='contained' onClick={handleCheckDuplicate}>중복확인</Button> 
                              : <Button variant='contained' disabled>중복확인</Button>
                    }
                    <Button variant='contained' onClick={handleNicknameRefresh}>닉네임 재추천</Button>
                </Stack>
                </Box>
                <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography variant='h5' sx={{ pt: 2, pb: 2, fontWeight: 'fontWeigntMedium' }}>
                        나이
                    </Typography>
                    <TextField id="age" value={state.age} onChange={handleAgeInput} />
                    <Typography variant='h5' sx={{ pt: 2, pb: 2, fontWeight: 'fontWeigntMedium' }}>
                        성별
                    </Typography>
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label="gender"
                            value={state.gender}
                            onChange={handleGenderSelect}
                            name="controlled-radio-buttons-group"
                        >
                            <FormControlLabel value='female' control={<Radio />} label="여성" />
                            <FormControlLabel value='male' control={<Radio />} label="남성" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Typography variant='h5' sx={{ fontWeight: 'fontWeigntMedium' }}>
                    프로필 사진
                </Typography>
                <Stack direction='row' spacing={5}>
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label="profileImage"
                            value={state.profileImage}
                            onChange={handleProfileImageSelect}
                            name="controlled-radio-buttons-group"
                        >
                            <FormControlLabel value={selectedFile.selectUrl} control={<Radio />} label="사용" />
                            <FormControlLabel value={imageUri.BOB_CHARACTER} control={<Radio />} label="미사용" />                            
                        </RadioGroup>
                    </FormControl>
                    <Avatar alt="프로필 사진" src={selectedFile.previewUrl} sx={{ width: 100, height: 100 }} />
                </Stack>
                <form id='myForm' name='myForm'>
                    <input
                        accept='image/*'
                        className={classes.input}
                        id='raised-button-file'
                        style={{ display: 'none', }}
                        type='file'
                        onChange={handleFileInput}
                    />
                    <label htmlFor='raised-button-file'>
                        <Button variant='contained' component='span' className={classes.button} size='small'>
                            이미지 첨부
                        </Button>
                    </label>
                </form>
                <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                </Box>
                <Button className={classes.root} onClick={handleJoin}>
                    <Typography variant='h6'>
                        가입하기&nbsp;
                        <EmojiProvider data={emojiData}>
                        <Emoji name="partying-face" width={20} />
                        </EmojiProvider>
                    </Typography>
                </Button>
                <Box>
                    {(state.errMsg) ? <Typography color='red' variant='subtitle1'>
                                        {state.errMsg}
                                    </Typography> 
                                  : null}
                </Box>
            </Stack>
        </Box>  
    );
}

const SignUpForm = connect(null, mapDispatchToProps)(SignUpFormComp);

export default SignUpForm;