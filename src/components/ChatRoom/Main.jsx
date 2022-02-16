import {useState} from 'react';
import PageBox from 'components/styled/PageBox'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import useChat from 'utils/useChat'

const ChatRoom = ({match}) => {
    const id = match.params.id
    console.log(id)
    const {messages, sendMessage} = useChat(id)
    const [newMessage, setNewMessage] = useState('')
    console.log('message', messages)

    const handleTextInput = event => {
        setNewMessage(event.target.value)
    }

    const handleButton = () => {
        sendMessage(newMessage)
        setNewMessage('')
    }

    return (
        <PageBox sx={{display:'flex'}}>
            <Grid container direction='column'>
                <Grid item>
                    <PageBox sx={{display:'flex'}}>
                        <TextField value={newMessage} sx={{width: '80%'}}
                            onChange={handleTextInput}/>
                        <Button onClick={handleButton}>send</Button>
                    </PageBox>
                </Grid>
                <Grid item container direction='column'>
                    {messages.map((el) => (
                        <Grid item>
                            <Typography varient='body1'>
                                {el.senderId} : {el.body}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            
        </PageBox>
    )

}

export default ChatRoom