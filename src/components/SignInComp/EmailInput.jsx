import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import {useSelector} from 'react-redux'
import { selectBasePath } from 'slices/basePath'
import NormalButton from 'components/styled/NormalButton'

const axios = require('axios');


const EmailInput = (props) => {

    const basePath = useSelector(selectBasePath)   

    const handleEmailInput = (event) => {
        props.setState({
            ...props.state,
            email: event.target.value,
        });
    };

    const handleAuth = async () => {
        await axios({
            method: 'POST',
            url: basePath.path + process.env.REACT_APP_API_EMAIL_AUTH,
            data: {
                email: props.state.email,
            }
        })
            .then(res => {
                props.setState({
                    ...props.state,
                    auth: res.data,
                    authInput: res.data,
                    pageNum: (props.state.pageNum + 1),
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <Grid container 
            direction='column'
            sx={{width: '100%'}}
        >
            <Grid item
                sx={{
                    pt: 2,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start'
                }}
            >
                <Typography variant='h6'
                    sx={{fontWeight: 'fontWeightBold'}}
                >
                    등록된 이메일로<br/>인증번호를 요청해주세요.
                </Typography>
            </Grid>
            <Grid item
                sx={{
                    pt: 2,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start'
                }}
            >
                <TextField
                    variant='standard'
                    placeholder='example@email.com'
                    autoFocus
                    value={props.state.email}
                    onChange={handleEmailInput}
                    sx={{width: '100%'}}
                />
            </Grid>
            <Grid item
                sx={{
                    pt: 4,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <NormalButton myColor='#000000'
                    variant='contained' 
                    onClick={handleAuth}
                    disabled={props.isPending}
                    sx={{
                        width: '100%',
                        backgroundColor: '#000000',
                        borderRadius: 2,
                    }}    
                >
                    {props.isPending 
                    ?
                        <CircularProgress size={20} thickness={2} />
                    :
                        <Typography variant='h6'
                            sx={{
                                fontWeight: 'fontWeightBold',
                                color: '#ffffff'
                            }}
                        >
                            인증번호 요청
                        </Typography>
                    }
                </NormalButton>
            </Grid>
        </Grid>
    )

}

export default EmailInput;