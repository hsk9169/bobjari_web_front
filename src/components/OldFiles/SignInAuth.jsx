import React from 'react';
import { connect } from 'react-redux';
import { v1 as uuid } from 'uuid';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Fab from '@mui/material/Fab';
import RefreshIcon from '@mui/icons-material/RotateLeft';
import "../styles/styles.css";
const axios = require('axios');

const mapStateToProps = state => {
    return {
        session: state.session,
    };
}

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

const SignInAuthComponent = (props) => {
    console.log(props.location.data.auth);

    const classes = useStyles();
    const [state, setState] = React.useState({
        auth: '',
        clockOn: false,
        errMsg: '',
    });

    const handleAuthInput = (event) => {
        setState({
            ...state,
            [event.target.id]: event.target.value,
        });
    };

    const handleSignIn = async (event) => {
        event.preventDefault();
        if (state.auth === props.location.data.auth) {
            await axios({
                method: 'POST',
                url: process.env.REACT_APP_API_SIGN_IN_BOB,
                data: {
                    email: props.location.data.email,
                }
                })
                .then(res => {
                    let retEmail = null;
                    try {
                        retEmail = res.data.userInfo.email;
                    } catch {
                    }
                    
                    if (retEmail === props.location.data.email) {
                        console.log('request getting token');
                        axios.get(process.env.REACT_APP_API_GET_TOKEN, 
                            { params: {
                                email: retEmail
                                }
                            })
                            .then(res => {
                                const token = res.data.token;
                                localStorage.setItem("accessToken", token.accessToken);
                                localStorage.setItem("refreshToken", token.refreshToken);
                                props.history.push({
                                    pathname: '/bobjari',
                                    data: {
                                        email: props.location.data.email,
                                    }
                                });
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    } else {
                        props.history.push({
                            pathname: '/signup/form',
                            data: {
                                email: props.location.data.email,
                            },
                        });
                    }
                })
            setState({
                ...state,
                errMsg: '',
            })
        } else {
            const msg = '인증번호 불일치, 다시 입력해주세요';
            setState({
                ...state,
                errMsg: msg,
            })
        }
        
    };

    const timerProps = {
        size: 120,
        strokeWidth: 10
    };

    const formatRemainingTime = (time) => {
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds}`;
    };

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            return (
                <Fab color="success" 
                    sx={{width: 100, height: 100}}
                    onClick={() => state.clockOn=true}    
                >
                    <RefreshIcon sx={{width: 60, height: 60}}/>
                </Fab>
            );
        }
      
        return (
            <div className="timer">
                <div className="value">{formatRemainingTime(remainingTime)}</div>
            </div>
        );
    };
      

    return (
        <Box
            sx={{
                px: 4,
                pt: 15,
                pb: 5,
                margin: 1,
                maxWidth: 400,
                height: 600,
                overflow: 'auto',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Box 
                sx={{display: 'flex', alignItems: 'center', 
                    justifyContent: 'center', margin: 2, pb: 4}}>
                <Typography variant='h4' sx={{ fontWeight: 'fontWeigntBold' }}>
                    인증번호 입력
                </Typography>
            </Box>
            <Box sx={{display: 'flex', position: 'relative',
                    alignItems: 'center', justifyContent: 'center'}}>
                <Box sx={{margin:0.5}}>
                    <FormControl sx={{ m: 1, width: '24ch' }} variant="outlined">
                        <Input
                            id="auth"
                            value={state.auth}
                            onChange={handleAuthInput}
                        />
                    </FormControl>
                </Box>
            </Box>
            <Box sx={{display: 'flex', position: 'relative',
                        alignItems: 'center', justifyContent: 'center', pt: 6}}>
                <CountdownCircleTimer
                    isPlaying
                    {...timerProps}
                    duration={180}
                    colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                    onComplete={() => [state.clockOn, 0]}
                >
                    {renderTime}
                </CountdownCircleTimer>
            </Box>
            <Box sx={{display: 'flex', position: 'relative',
                        alignItems: 'center', justifyContent: 'center', pt: 6}}>
                <Button className={classes.root} onClick={handleSignIn}>
                    <Typography variant='h6'>
                        인증완료
                    </Typography>
                </Button>
            </Box>
            <Box sx={{display: 'flex', position: 'relative',
                        alignItems: 'center', justifyContent: 'center'}}>
                <Typography color='red' variant='subtitle1'>
                    {state.errMsg}
                </Typography>
            </Box>    
        </Box>   
    );
}

const SignInAuth = connect(mapStateToProps)(SignInAuthComponent);

export default SignInAuth;