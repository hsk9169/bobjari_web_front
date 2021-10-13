import React from 'react';
const authInfo = require('../constants/kakao-auth');

const Main = (props) => {

    const redirectUri = () => {
        let baseUri = authInfo.BASE_URI;
        baseUri = baseUri.concat('client_id=', authInfo.CLIENT_ID, '&');
        baseUri = baseUri.concat('client_secret=', authInfo.SECRET_KEY, '&');
        baseUri = baseUri.concat('redirect_uri=', authInfo.CALLBACK_URI, '&');
        baseUri = baseUri.concat('response_type=', 'code');
        return baseUri;
    }

    const kakaoJoinHandler = () => {
        window.location.assign(redirectUri());
    }

    return (
        <div>
            <h1>Main</h1>
            <button onClick={() => {
                props.history.push('/login');
            }}>로그인</button>
            <button onClick={() => {
                props.history.push('/kakaoLogin');
            }}>카카오로 로그인</button>
            <button onClick={() => {
                props.history.push('/join');
            }}>회원가입</button>
            <button type="button" onClick={kakaoJoinHandler}>카카오로 회원가입</button>
        </div>
    );
}

export default Main;