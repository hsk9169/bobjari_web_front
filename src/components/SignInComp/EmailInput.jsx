import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import EmailIcon from '@mui/icons-material/Email';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input'
import { red } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
const axios = require('axios');


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

const EmailInput = (props) => {

    const classes = useStyles();

    const handleEmailInput = (event) => {
        props.setState({
            ...props.state,
            [event.target.id]: event.target.value,
        });
    };

    const handleAuth = async () => {
        await axios({
            method: 'POST',
            url: process.env.REACT_APP_API_EMAIL_AUTH,
            data: {
                email: props.state.email,
            }
        })
            .then(res => {
                props.setState({
                    ...props.state,
                    auth: res.data,
                    // For Test
                    authInput: res.data,
                    pageNum: (props.state.pageNum + 1),
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div>
            <Box sx={{display: 'flex', position: 'relative',
                    alignItems: 'center', justifyContent: 'center'}}>
                <Box sx={{margin:0.5}}>
                    <EmailIcon sx={{width: 30, height: 30, color: red[300]}}/>
                </Box>
                <Box sx={{margin:0.5}}>
                    <FormControl sx={{ m: 1, width: '24ch' }} variant="outlined">
                        <Input
                            id="email"
                            value={props.state.email}
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
            </div>
    )

}

export default EmailInput;