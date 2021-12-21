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
        let profile = null;

        async function getUserProfile (code) {

            await axios({
                method: 'POST',
                url: process.env.REACT_APP_API_KAKAO_AUTH,
                data: {
                    client_id: authInfo.CLIENT_ID,
                    redirect_uri: authInfo.CALLBACK_URI,
                    access_code: code, 
                    secret_key: authInfo.SECRET_KEY,
                }
            })
                .then(res => {
                    profile = res.data;
                    
                    axios({
                        method: 'POST',
                        url: process.env.REACT_APP_API_SIGN_IN_KAKAO,
                        data: {
                            email: profile.email,
                        }
                    })
                        .then(res => {
                            let retEmail = null;
                            try {
                                retEmail = res.data.userInfo.email;
                            } catch {}
                            console.log(res.data)
        
                            if (retEmail === profile.email) {
                                console.log('request getting token');
                                axios.get(process.env.REACT_APP_API_GET_TOKEN,
                                    { params: {
                                        email: retEmail,
                                    }
                                })
                                    .then(res => {
                                        const token = res.data.token;
                                        localStorage.setItem("accessToken", token.accessToken);
                                        localStorage.setItem("refreshToken", token.refreshToken);
                                        props.history.push({
                                            pathname: '/bobjari',
                                            data: {
                                                email: profile.email,
                                            }
                                        });
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })
                            } else {
                                props.history.push({
                                    pathname: '/signup',
                                    data: profile,
                                });
                            }
                        })
                    
                })
        }
        
        if (accessCode) {
            const code = accessCode;
            getUserProfile(code);
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