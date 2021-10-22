import React, { useState } from 'react';
import { addSession } from '../actions/index';
import { connect } from 'react-redux';
//import { v1 as uuid } from 'uuid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import createNickname from '../middleware/create-nickname';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import Avatar from '@mui/material/Avatar';

import qs from 'qs';
import { LocalAirportTwoTone } from '@mui/icons-material';
const apiInfo = require('../constants/api');
const imageUri = require('../constants/image-uri');
const axios = require('axios');
//const authInfo = require('../constants/kakao-auth');

const mapDispatchToProps = dispatch => {
    return {
        addSession: session => dispatch(addSession(session)),
    };
};

const checkDuplicate = async (nickname) => {
    let ret;
    await axios({
        method: 'GET',
        //url: apiInfo.CHECK_NICKNAME,
        url: 'http://localhost:8000/api/users/nickname',
        data: {
            nickname: nickname,
        }})
        .then(res => {
            console.log(res);
            ret = res.data;
        })
        .catch(err => {
            console.log(err);
        });
    console.log(ret);
    return ret;
};

const KakaoLoginComp = ({location}) => {

    const initialNickname = createNickname();
    const [ state, setState ] = useState({
        email: location.props.email,
        age: location.props.age,
        gender: location.props.gender,
        profileImage: ( (location.props.profileImage) ? location.props.profileImage
                                                      : imageUri.BOB_CHARACTER ),
        nickname: initialNickname,
        password: '',
        passwordCheck: '',
        showPassword: false,
        showPasswordCheck: false,
        isDuplicated: false,
    });

    
    //const id = uuid();

    const handleNicknameInput = (event) => {
        setState({
            ...state, 
            [event.target.id]: event.target.value,
            isDuplicated: false,
        })
    };

    const handlePasswordInput = (event) => {
        setState({
            ...state, 
            [event.target.id]: event.target.value,
        })
    };

    const handleClickShowPassword = (event) => {
        setState({
            ...state,
            showPassword: !state.showPassword,
        })
    };

    const handlePasswordCheckInput = (event) => {
        setState({
            ...state, 
            [event.target.id]: event.target.value,
        })
    };

    const handleClickShowPasswordCheck = (event) => {
        setState({
            ...state,
            showPasswordCheck: !state.showPasswordCheck,
        })
    };

    const handleEmailInput = (event) => {
        setState({
            ...state, 
            [event.target.id]: event.target.value,
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
        console.log(state.gender);
    };

    const handleCheckDuplicate = async (event) => {
        event.preventDefault();
        let ret, duplicate;
        await axios({
            method: 'GET',
            //url: apiInfo.CHECK_NICKNAME,
            url: apiInfo.CHECK_NICKNAME_LOCAL,
            data: {
                nickname: '행복한부엉이',
            }})
            .then(res => {
                console.log(res);
                ret = res.data;
            })
            .catch(err => {
                console.log(err);
            });
        if (ret === 'available') duplicate = false;
        else if (ret === 'duplicated') duplicate = true;
        setState({
            ...state,
            isDuplicated: duplicate,
        });
        console.log(state);
    };

    const handleNicknameRefresh = (event) => {
        event.preventDefault();
        const recommend = createNickname();
        setState({
            ...state, 
            nickname: recommend,
        });
        console.log(state);
    };

    const handleProfileImageSelect = (event) => {
        event.preventDefault();
        setState({
            ...state,
            profileImage: event.target.value,
        });
        console.log(state.profileImage);
    };

    return (
        <div>
            <Stack direction='column' spacing={2}>
                <h3>이름</h3>
                <p>성공적인 밥자리를 위해<br/>개성 넘치는 이름을 설정해주세요</p>
                <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                    {state.isDuplicated ? <TextField error id='nickname' value={state.nickname} helperText='닉네임 중복입니다'
                                    onChange={handleNicknameInput}></TextField>
                                  : <TextField id='nickname' value={state.nickname} helperText='사용 가능합니다'
                                    onChange={handleNicknameInput}></TextField>
                    }
                
                <Stack direction='row' spacing={1}>
                    {(state.nickname.length > 3) ? <Button variant='contained' onClick={handleCheckDuplicate}>중복확인</Button> 
                              : <Button variant='contained' disabled>중복확인</Button>
                    }
                    <Button variant='contained' onClick={handleNicknameRefresh}>닉네임 재추천</Button>
                </Stack>
                <h3>비밀번호</h3>
                {(state.password.length < 8) 
                    ?<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password" error>비밀번호 입력</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={state.showPassword ? 'text' : 'password'}
                                value={state.password}
                                onChange={handlePasswordInput}
                                error
                                aria-describedby="component-error-text"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {state.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        <FormHelperText error id="component-error-text">8자리 이상 입력해주세요</FormHelperText>
                    </FormControl>
                    :<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">비밀번호 입력</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={state.showPassword ? 'text' : 'password'}
                                value={state.password}
                                onChange={handlePasswordInput}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {state.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                    </FormControl>
                }
                {(state.passwordCheck !== state.password) 
                    ?<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password" error>비밀번호 입력</InputLabel>
                            <OutlinedInput
                                id="passwordCheck"
                                type={state.showPasswordCheck ? 'text' : 'password'}
                                value={state.passwordCheck}
                                onChange={handlePasswordCheckInput}
                                error
                                aria-describedby="component-error-text"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPasswordCheck}
                                            edge="end"
                                        >
                                            {state.showPasswordCheck ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        <FormHelperText error id="component-error-text">일치하지 않습니다</FormHelperText>
                    </FormControl>
                    :<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">비밀번호 입력</InputLabel>
                            <OutlinedInput
                                id="passwordCheck"
                                type={state.showPasswordCheck ? 'text' : 'password'}
                                value={state.passwordCheck}
                                onChange={handlePasswordCheckInput}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPasswordCheck}
                                            edge="end"
                                        >
                                            {state.showPasswordCheck ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                    </FormControl>
                }

                </Box>
                <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                    <h3>이메일</h3>
                    {(location.props.email) ? <TextField disabled id="email" value={state.email} variant='filled'/>
                                   : <TextField id="email" value={state.email} onChange={handleEmailInput} />
                    }
                    <h3>나이</h3>
                    {(location.props.age) ? <TextField disabled id="age" value={state.age} variant='filled'/>
                                   : <TextField id="age" value={state.age} onChange={handleAgeInput} />
                    }
                    <h3>성별</h3>
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label="gender"
                            value={state.gender}
                            onChange={handleGenderSelect}
                            name="controlled-radio-buttons-group"
                        >
                            {(location.props.gender) ? <FormControlLabel disabled value='female' control={<Radio />} label="여성" />
                                                     : <FormControlLabel value='female' control={<Radio />} label="여성" />
                            }
                            {(location.props.gender) ? <FormControlLabel disabled value='male' control={<Radio />} label="남성" />
                                                     : <FormControlLabel value='male' control={<Radio />} label="남성" />
                            }
                        </RadioGroup>
                    </FormControl>
                </Box>
                <div>
                    <h3>프로필 사진</h3>
                    <Stack direction='row' spacing={5}>
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="profileImage"
                                value={state.profileImage}
                                onChange={handleProfileImageSelect}
                                name="controlled-radio-buttons-group"
                            >
                                {(location.props.profileImage) ? <FormControlLabel value={location.props.profileImage} control={<Radio />} label="사용" />
                                                               : <FormControlLabel disabled value={location.props.profileImage} control={<Radio />} label="사용" />
                                }
                                {(location.props.profileImage) ? <FormControlLabel value={imageUri.BOB_CHARACTER} control={<Radio />} label="미사용" />
                                                               : <FormControlLabel disabled value={imageUri.BOB_CHARACTER} control={<Radio />} label="미사용" />
                                }
                            </RadioGroup>
                        </FormControl>
                        <Avatar alt="프로필 사진" src={state.profileImage} sx={{ width: 100, height: 100 }} />
                    </Stack>
                </div>
                <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                </Box>
            </Stack>
            <br/><br/><br/><br/>
        </div>  
    );
}

const KakaoLogin = connect(null, mapDispatchToProps)(KakaoLoginComp);

export default KakaoLogin;