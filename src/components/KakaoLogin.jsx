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

const KakaoLoginComp = ({location}) => {

    const initialNickName = createNickname();
    const [ state, setState ] = useState({
        email: location.props.email,
        age: location.props.age,
        gender: location.props.gender,
        profileImage: location.props.profileImage,
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
            <h2>이름</h2>
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
                {(location.props.email) ?
                <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                    <h2>이메일</h2>
                    <TextField
                        disabled
                        id="email"
                        defaultValue={state.email}
                        variant='filled'
                    />
                    <h2>나이</h2>
                    <TextField
                        disabled
                        id="age"
                        defaultValue={state.age}
                        variant='filled'
                    />
                    <h2>성별</h2>
                    <TextField
                        disabled
                        id="gender"
                        defaultValue={state.gender}
                        variant='filled'
                    />
                </Box>
                : <br/>}
                {(location.props.profileImage) ?
                    <div>
                        <h2>프로필 사진</h2>
                        <img src={state.profileImage} alt='프로필 이미지' />
                    </div>
                : <br/>}
            </Stack>
        </div>
    );
}

const KakaoLogin = connect(null, mapDispatchToProps)(KakaoLoginComp);

export default KakaoLogin;