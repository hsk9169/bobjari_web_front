import {useState} from 'react';
import Grid from '@mui/material/Grid'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ButtonBase from '@mui/material/ButtonBase';
import EmailInput from 'components/SignInComp/EmailInput';
import EmailAuth from 'components/SignInComp/EmailAuth';
import {saveJWT} from 'utils/handle-jwt'
import { useDispatch, useSelector } from "react-redux";
import { addSession } from "slices/session";
import { selectBasePath } from 'slices/basePath'

const axios = require('axios');


const SignInBob = ({context, history}) => {

    const [state, setState] = useState({
        email: '',
        pageNum: 0,
        auth: '',
        authInput: '',
        clockOn: false,
        errMsg: '',
    });
    const [isPending, setIsPending] = useState(false);

    const dispatch = useDispatch();

    const basePath = useSelector(selectBasePath)   

    const handleSignIn = async (event) => {
        event.preventDefault();
        setIsPending(true)
        if (state.auth === state.authInput) {

            await axios({
                method: 'POST',
                url: basePath.path + process.env.REACT_APP_API_SIGNIN_BOB,
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
                        axios.get(basePath.path + process.env.REACT_APP_API_GET_TOKEN, 
                            { 
                                params: {
                                    email: retEmail
                                }
                            })
                            .then(res => {
                                setIsPending(false)
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
            history.goBack()
        }
    }

    const RenderBody = () => {
            switch (state.pageNum) {
                case 0:
                    return (<EmailInput 
                            state={state} 
                            setState={setState} 
                            isPending={isPending}
                            />)
                case 1:
                    return (<EmailAuth 
                            state={state} 
                            setState={setState} 
                            handleSignIn={handleSignIn}
                            />)
                default:
                    break;
            }
        
    }

    return (
        <Grid container
            direction='column'
            sx={{
                p: 2,
                width: '100%',
                display: 'flex',
            }}
        >
            <Grid item container
                sx={{width: '100%', height: 50}}
            >
                <ButtonBase>
                    <ArrowBackIosIcon 
                        color='disabled' 
                        onClick={handleBack} 
                    />
                </ButtonBase>
            </Grid>
            <Grid item container>
                <RenderBody />
            </Grid>
        </Grid>
    );
}

export default SignInBob;