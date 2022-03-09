import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ButtonBase from '@mui/material/ButtonBase';
import EmailInput from 'components/SignInComp/EmailInput';
import EmailAuth from 'components/SignInComp/EmailAuth';
import {saveJWT} from 'utils/handle-jwt'
import { useDispatch } from "react-redux";
import { addSession } from "slices/session";

const axios = require('axios');

const pageTitle = [
    '밥자리 로그인',
    '인증번호 입력',
]

const SignInBob = ({context, history}) => {

    const [state, setState] = React.useState({
        email: '',
        pageNum: 0,
        auth: '',
        authInput: '',
        clockOn: false,
        errMsg: '',
    });
    const [isPending, setIsPending] = React.useState(false);

    const dispatch = useDispatch();


    const handleSignIn = async (event) => {
        event.preventDefault();
        if (state.auth === state.authInput) {

            await axios({
                method: 'POST',
                url: process.env.REACT_APP_API_SIGNIN_BOB,
                data: {
                    email: state.email,
                }
            })
                .then(res => {
                    let retEmail = null;
                    try {
                        retEmail = res.data.profile.email;
                    } catch {
                    }
                    
                    if (retEmail === state.email) {
                        dispatch(addSession(res.data))
                        axios.get(process.env.REACT_APP_API_GET_TOKEN, 
                            { 
                                params: {
                                    email: retEmail
                                }
                            })
                            .then(res => {
                                const tokens = res.data.token;
                                history.push({
                                    pathname: '/main',
                                    data: {
                                        email: state.email,
                                    }
                                });
                                saveJWT(tokens)
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    } else {
                        history.push({
                            pathname: '/signup',
                            data: {
                                email: state.email,
                            },
                        });
                    }
                })
        } else {
            const msg = '인증번호 불일치, 다시 입력해주세요';
            setState({
                ...state,
                errMsg: msg,
            })
        }
        
    };

    const handleBack = () => {
        if (state.pageNum===1) {
            setState({
                ...state,
                pageNum: state.pageNum - 1,
            })
        } else {
            history.replace({
                pathname: '/',
            })
        }
    }

    const RenderBody = () => {
            switch (state.pageNum) {
                case 0:
                    return (<EmailInput state={state} setState={setState} />)
                case 1:
                    return (<EmailAuth state={state} setState={setState} onClick={handleSignIn}/>)
                default:
                    break;
            }
        
    }

    return (
        <div>
        <Box sx={{
            pt: 1,
            pb: 1,
            margin: 2,
            maxWidth: 400,
            height: 50,
            display: 'flex',
        }}>
            <ButtonBase>
                <ArrowBackIosIcon color='disabled' onClick={handleBack} />
            </ButtonBase>
                    
        </Box>
        
        <Box
            sx={{
                pt: 5,
                pb: 5,
                margin: 1,
                maxWidth: 400,
                overflow: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box 
                sx={{
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: 2, 
                    pt: 4,
                    pb: 4
                    }}
            >
                <Typography variant='h4' sx={{ fontWeight: 'fontWeigntBold' }}>
                    {pageTitle[state.pageNum]}
                </Typography>
            </Box>
            <div>
                {RenderBody()}
            </div>
            
        </Box>   

        </div>
    );
}

export default SignInBob;