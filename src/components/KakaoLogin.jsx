import React, { useEffect, useState } from 'react';
import { addSession } from '../actions/index';
import { connect } from 'react-redux';
import { v1 as uuid } from 'uuid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import createNickname from '../middleware/create-nickname';
const axios = require('axios');
const authInfo = require('../constants/kakao-auth');

const mapDispatchToProps = dispatch => {
    return {
        addSession: session => dispatch(addSession(session)),
    };
};

const KakaoLoginComp = props => {

    const initialNickName = createNickname();
    const [ state, setState ] = useState({
        email: props.profile.email,
        age: props.profile.age,
        gender: props.profile.gender,
        profileImg: props.profile.profileImg,
        nickName: initialNickName,
        isOverlapped: false,
    });
    const id = uuid();

    const handleNickNameInput = (event) => {
        setState({
            nickName: event.target.value,
            isOverlapped: false,
        })
    };

    const handleCheckOverlap = (event) => {
        event.preventDefault();
        setState({
            ...state, isOverlapped: true
        });
    };

    const handleNicknameRefresh = (event) => {
        event.preventDefault();
        const recommend = createNickname();
        setState({
            nickName: recommend, isOverlapped: false
        });
        console.log(state);
    };

    return (
        <div>
            <h1>이름</h1>
            <p>성공적인 밥자리를 위해<br/>개성 넘치는 이름을 설정해주세요</p>
            <Stack direction='column' spacing={2}>
                <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                    {state.isOverlapped ? <TextField error id='nickName' value={state.nickName} helperText='중복입니다'
                                    onChange={handleNickNameInput}></TextField>
                                  : <TextField id='nickName' value={state.nickName} helperText='4글자 이상 작성'
                                    onChange={handleNickNameInput}></TextField>
                    }
                </Box>
                <Stack direction='row' spacing={1}>
                    {(state.nickName.length > 3) ? <Button variant='contained' onClick={handleCheckOverlap}>중복확인</Button> 
                              : <Button variant='contained' disabled>중복확인</Button>
                    }
                    <Button variant='contained' onClick={handleNicknameRefresh}>닉네임 재추천</Button>
                </Stack>
                <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                    <TextField
                        disabled
                        id="email"
                        defaultValue={state.email}
                        variant='filled'
                    />
                    <TextField
                        disabled
                        id="age"
                        defaultValue={state.age}
                        variant='filled'
                    />
                    <TextField
                        disabled
                        id="email"
                        defaultValue={state.gender}
                        variant='filled'
                    />
                </Box>
                <img src={state.profileImg} alt='프로필 이미지' />
            </Stack>
        </div>
    );
}

const KakaoLogin = connect(null, mapDispatchToProps)(KakaoLoginComp);

export default KakaoLogin;