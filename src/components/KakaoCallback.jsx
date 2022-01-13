import React, { useEffect } from 'react';
import {saveJWT} from 'utils/handle-jwt'
import PageBox from 'components/styled/PageBox'
import CircularProgress from '@mui/material/CircularProgress';
const axios = require('axios');
const authInfo = require('constants/kakao-auth');

const KakaoCallback = (props) => {

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
        
                            if (retEmail === profile.email) {
                                axios.get(process.env.REACT_APP_API_GET_TOKEN,
                                    { params: {
                                        email: retEmail,
                                    }
                                })
                                .then(res => {
                                    const tokens = res.data.token;
                                    props.history.push({
                                        pathname: '/main',
                                        data: {
                                            email: profile.email,
                                        }
                                    });
                                    saveJWT(tokens)
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
            <PageBox sx={{
                display: 'flex',
                width: '100%',
                pt: 40,
            }}>
                <CircularProgress size={80} thickness={5} />
            </PageBox>
        </div>
    );
}

export default KakaoCallback;