import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import NormalButton from 'components/styled/NormalButton'

const EmailAuth = (props) => {
    

    const handleAuthInput = (event) => {
        props.setState({
            ...props.state,
            [event.target.id]: event.target.value,
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
                    이메일로 받은<br/>인증번호를 입력해주세요.
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
                    value={props.state.authInput}
                    onChange={handleAuthInput}
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
                    onClick={props.handleSignIn}
                    sx={{
                        width: '100%',
                        backgroundColor: '#000000',
                        borderRadius: 2,
                    }}    
                >
                    <Typography variant='h6'
                        sx={{
                            fontWeight: 'fontWeightBold',
                            color: '#ffffff'
                        }}
                    >
                        인증하기
                    </Typography>
                </NormalButton>
            </Grid>
        </Grid>
        
    )
}

export default EmailAuth;