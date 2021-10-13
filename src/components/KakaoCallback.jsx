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

const KakaoCallbackComponent = (props) => {

    const accessCode = new URL(window.location.href).searchParams.get("code");

    useEffect( () => {

        async function getAccessToken (code) {

            const id = uuid();

            await axios({
                method: 'POST',
                url: authInfo.GETTOKEN_URI,
                data: {
                    client_id: authInfo.CLIENT_ID,
                    redirect_uri: authInfo.CALLBACK_URI,
                    access_code: code, 
                    secret_key: authInfo.SECRET_KEY,
                }
            })
                .then(res => {
                    const account = {
                        profile: res.data.email,
                        gender: res.data.gender,
                        age: res.data.age,
                        profileImg: res.data.profileImg,
                    };
                    props.addSession({ account, id });
                })
        }
        
        if (accessCode) {
            const code = accessCode;
            getAccessToken(code);
        }           
        
    }, [props, accessCode]);


    return (
        <div>
            <h1>Kakao Callback</h1>
        </div>
    );
}

const KakaoCallback = connect(null, mapDispatchToProps)(KakaoCallbackComponent);

export default KakaoCallback;