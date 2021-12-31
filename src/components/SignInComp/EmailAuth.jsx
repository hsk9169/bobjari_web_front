import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Input from '@mui/material/Input'
import Fab from '@mui/material/Fab';
import RefreshIcon from '@mui/icons-material/RotateLeft';
import { makeStyles } from '@mui/styles';


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

const EmailAuth = (props) => {
    
    const classes = useStyles();


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
                    onClick={() => props.state.clockOn=true}    
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

    const handleAuthInput = (event) => {
        props.setState({
            ...props.state,
            [event.target.id]: event.target.value,
        });
    };

    

    return (
        <div>
            <Box sx={{display: 'flex', position: 'relative',
                    alignItems: 'center', justifyContent: 'center'}}>
                <Box sx={{margin:0.5}}>
                    <FormControl sx={{ m: 1, width: '24ch' }} variant="outlined">
                        <Input
                            id="authInput"
                            value={props.state.authInput}
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
                    onComplete={() => [props.state.clockOn, 0]}
                >
                    {renderTime}
                </CountdownCircleTimer>
            </Box>
            <Box sx={{display: 'flex', position: 'relative',
                        alignItems: 'center', justifyContent: 'center', pt: 6}}>
                <Button className={classes.root} onClick={props.onClick}>
                    <Typography variant='h6'>
                        인증완료
                    </Typography>
                </Button>
            </Box>
            <Box sx={{display: 'flex', position: 'relative',
                        alignItems: 'center', justifyContent: 'center'}}>
                <Typography color='red' variant='subtitle1'>
                    {props.state.errMsg}
                </Typography>
            </Box>    
        </div>
    )
}

export default EmailAuth;