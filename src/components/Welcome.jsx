import React from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { makeStyles } from '@mui/styles';
const authInfo = require('../constants/kakao-auth');

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

const Welcome = (props) => {

    const classes = useStyles();

    const redirectUri = () => {
        let baseUri = authInfo.BASE_URI;
        baseUri = baseUri.concat('client_id=', authInfo.CLIENT_ID, '&');
        baseUri = baseUri.concat('client_secret=', authInfo.SECRET_KEY, '&');
        baseUri = baseUri.concat('redirect_uri=', authInfo.CALLBACK_URI, '&');
        baseUri = baseUri.concat('response_type=', 'code');
        return baseUri;
    }

    const kakaoButtonHandler = () => {
        window.location.assign(redirectUri());
    }

    const bobjariSignInButtonHandler = () => {
        props.history.push('/login');
    }

    const bobjariSignUpButtonHandler = () => {
        props.history.push('/login');
    }

    return (
        <div>
            <h1 align='center'>속 시원한</h1>
            <h1 align='center'>현직자 인터뷰, 밥자리</h1>
            <p align='center'>오래 꿈꿔온 직업부터<br/>한 번 알아보고 싶은 직업까지</p>
            <div>
                <img src={require('../contents/kakao_login_medium_wide.png').default} alt="카카오 로그인 버튼"
                 onClick={() => {
                    kakaoButtonHandler();
                 }}/>
            </div>
            <div>
                <Button className={classes.root} onClick={() => {
                    bobjariSignInButtonHandler();
                }}>밥자리 계정으로 로그인</Button>
            </div>
            <div>
                <Link
                    component="button"
                    variant="body2"
                    onClick={() => {
                        bobjariSignUpButtonHandler();
                    }}
                >
                    밥자리 회원가입
                </Link>
            </div>      
        </div>
    );
}

export default Welcome;