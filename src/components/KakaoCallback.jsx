import React, { useEffect } from 'react';

import { addSession } from '../actions/index';
import { connect } from 'react-redux';
import { v1 as uuid } from 'uuid';
const axios = require('axios');
const authInfo = require('../constants/kakao-auth');

const mapDispatchToProps = dispatch => {
    return {
        addSession: session => dispatch(addSession(session)),
    };
};

const mapStateToProps = state => {
    return {
        api: state.api,
    };
}

const KakaoCallbackComponent = (props) => {

    const accessCode = new URL(window.location.href).searchParams.get("code");

    useEffect( () => {

        async function getAccessToken (code) {

            await axios({
                method: 'POST',
                url: process.env.REACT_APP_API_KAKAO_TOKEN,
                data: {
                    client_id: authInfo.CLIENT_ID,
                    redirect_uri: authInfo.CALLBACK_URI,
                    access_code: code, 
                    secret_key: authInfo.SECRET_KEY,
                }
            })
                .then(res => {
                    // check if res has token
                    // if not, pass to sign up form
                    // or, take token and sign in
                    const token = res.data.token;
                    if (token) {
                        const id = uuid();
                        props.addSession({ token, id });
                        localStorage.setItem("accessToken", token.accessToken);
                        localStorage.setItem("refreshToken", token.refreshToken);
                        props.history.push({
                            pathname: '/main',
                            data: {
                                email: res.data.email,
                            },
                        });
                    } else {
                        console.log(res);
                        props.history.push({
                            pathname: '/kakao-signup/form',
                            data: res.data,
                        });
                    }
                })
        }
        
        if (accessCode) {
            const code = accessCode;
            getAccessToken(code);
        }           
        
    }, [props, accessCode]);


    return (
        <div>
            카카오콜백
        </div>
    );
}

const KakaoCallback = connect(mapStateToProps, mapDispatchToProps)(KakaoCallbackComponent);

export default KakaoCallback;