import {useRef, useEffect} from 'react'
import Grid from '@mui/material/Grid'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SendIcon from '@mui/icons-material/Send';

const ChatInput = (props) => {

    const ref = useRef(null)

    useEffect(() => {
        if (ref.current !== null)
            props.setAlertHeight(ref.current.clientHeight - 10)
        console.log('input effect')
    }, [])
    

    return (
        <Grid container 
            ref={ref}
            direction='column' 
            sx={{
                p:2, 
                position: 'fixed', 
                bottom: 0, 
                left: 0, 
                right: 0
            }}
        >
            <Grid item>
                <FormControl 
                    sx={{width: '100%'}} 
                    variant="outlined"
                >
                    <OutlinedInput
                        value={props.input}
                        placeholder='메시지를 입력해주세요.'
                        onChange={props.onTextInput}
                        endAdornment={
                            <InputAdornment position="end">
                                <SendIcon
                                    onClick={props.onButton}
                                    edge="end"
                                    sx={{color: '#f75910'}}
                                />
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default ChatInput