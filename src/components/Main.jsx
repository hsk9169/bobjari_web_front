import React, { useEffect } from 'react';
import { addSession } from '../actions/index';
import { connect } from 'react-redux';
import { v1 as uuid } from 'uuid';
const authInfo = require('../constants/kakao-auth');

const mapDispatchToProps = dispatch => {
    return {
        addSession: session => dispatch(addSession(session)),
    };
};

const MainComponent = (props) => {

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

    const accessCode = new URL(window.location.href).searchParams.get("code");

    useEffect( (props) => {
        console.log(accessCode);
        const id = uuid();
        props.addSession( { accessCode, id });
    });

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

const Main = connect(null, mapDispatchToProps)(MainComponent);

export default Main;