import React from 'react';
import { connect } from 'react-redux';
import { v1 as uuid } from 'uuid';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import EmailIcon from '@mui/icons-material/Email';
import { red } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
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
  
const SignInComponent = (props) => {

    const classes = useStyles();
    const [state, setState] = React.useState({
        email: '',
    });

    const handleEmailInput = (event) => {
        setState({
            ...state,
            [event.target.id]: event.target.value,
        });
    };

    const handleAuth = async () => {
        await axios({
            method: 'POST',
            url: process.env.REACT_APP_API_EMAIL_AUTH,
            data: {
                email: state.email,
            }
        })
            .then(res => {
                const auth = res.data;
                props.history.push({
                    pathname: '/signin/auth',
                    data: {
                        email: state.email,
                        auth: auth,
                    }
                });
            })
            .catch(err => {
                console.log(err);
            });
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
                    밥자리 로그인
                </Typography>
            </Box>
                <Box sx={{display: 'flex', position: 'relative',
                        alignItems: 'center', justifyContent: 'center'}}>
                    <Box sx={{margin:0.5}}>
                        <EmailIcon sx={{width: 30, height: 30, color: red[300]}}/>
                    </Box>
                    <Box sx={{margin:0.5}}>
                        <FormControl sx={{ m: 1, width: '24ch' }} variant="outlined">
                            <Input
                                id="email"
                                value={state.email}
                                onChange={handleEmailInput}
                                aria-describedby="component-error-text"
                            />
                        </FormControl>
                    </Box>
                </Box>
            <Box sx={{display: 'flex', position: 'relative',
                        alignItems: 'center', justifyContent: 'center', pt: 6}}>
                <Button className={classes.root} onClick={handleAuth}>
                    <Typography variant='h6'>
                        인증번호 요청
                    </Typography>
                </Button>
            </Box>
        </Box>   
    );
}

const SignIn = connect(mapStateToProps)(SignInComponent);

export default SignIn;