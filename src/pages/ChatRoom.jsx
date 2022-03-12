import {useState, useEffect} from 'react';
import PageBox from 'components/styled/PageBox'
import Grid from '@mui/material/Grid'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import useChat from 'utils/handle-chat'
import {getJWT} from 'utils/handle-jwt'
import {TopBar, ChatInput, Messages} from 'components/ChatRoom'
import {useSelector} from 'react-redux'
import { selectBasePath } from 'slices/basePath'
const axios = require('axios');

const ChatRoom = ({location, history}) => {

    const { innerHeight: height} = window;
    const [alertVPos, setAlertVPos] = useState(null)
    const [messageVPos, setMessageVPos] = useState(null)
    const [roomInfo, setRoomInfo] = useState(location.data.roomInfo)
    const [chatList, setChatList] = useState(null)
    const [newMessage, setNewMessage] = useState('')
    const [isPending, setIsPending] = useState(false)
    const [queryId, setQueryId] = useState(0)
    const [openAlert, setOpenAlert] = useState(false)

    const {rcvMessage, sendMessage, response} = useChat(roomInfo.id)
    const basePath = useSelector(selectBasePath)   

    const handleBack = () => {
        history.goBack()
    }

    const handleTextInput = event => {
        setNewMessage(event.target.value)
    }

    const handleSendMessage = () => {
        if (newMessage.length > 0) {
            sendMessage(newMessage)
            if (response) {
                setNewMessage('')
            }
            else {
                setOpenAlert(true)
            }
        }
    }

    const handleGetMoreMessages = async () => {
        setIsPending(true)
        await axios.get(basePath.path + process.env.REACT_APP_API_CHAT,
            {
                headers: {
                    Authorization: `Bearer ${getJWT().accessToken}`,
                },
                params: {
                    bobjariId: roomInfo.id,
                    startIdx: queryId,
                    num: 50,
                },
            })
            .then(res => {
                const messages = res.data
                if (messages.length > 0) {
                    setChatList([
                            ...messages.reverse(), 
                            ...chatList
                        ])
                    setQueryId(queryId + messages.length)
                    setIsPending(false)
                } else {
                    setIsPending(null)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }    
    
    const handleCloseAlert = (reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpenAlert(false)
    }
    
    useEffect(() => {
        async function getRecentMessages() {
            await axios.get(basePath.path + process.env.REACT_APP_API_CHAT,
                {
                    headers: {
                        Authorization: `Bearer ${getJWT().accessToken}`,
                    },
                    params: {
                        bobjariId: roomInfo.id,
                        startIdx: queryId,
                        num: 50,
                    },
                })
                .then(res => {
                    const messages = res.data
                    setIsPending(false)
                    setChatList([
                        ...messages.reverse(), 
                    ])
                    setQueryId(messages.length)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        getRecentMessages()
    }, [])

    
    

    return (
        <div>
        <PageBox sx={{display:'flex'}}>
            <Grid container direction='column'>
                <Grid item>
                    <TopBar 
                        nickname={(roomInfo.mentee.user !== undefined
                                ? roomInfo.mentee.user.profile.nickname
                                : roomInfo.mentor.user.profile.nickname)}
                        handleBack={handleBack}
                        setMessageVPos={setMessageVPos}
                    />
                </Grid>
                
                <Grid item>
                    <Messages
                        rcvMessage={rcvMessage}
                        chatList={chatList}
                        getMoreMessages={handleGetMoreMessages}
                        isPending={isPending}
                        roomInfo={roomInfo}
                        topPosition={messageVPos}
                        height={height - messageVPos - alertVPos}
                    />
                </Grid>
            </Grid>
            <ChatInput
                setAlertHeight={setAlertVPos}
                input={newMessage}
                onTextInput={handleTextInput}
                onButton={handleSendMessage}
            />
            <Snackbar open={openAlert} 
                autoHideDuration={1500} 
                onClose={handleCloseAlert}
            >
                <Alert onClose={handleCloseAlert} 
                    severity='error' 
                    sx={{width: '100%', 
                        position: 'absolute', 
                        bottom: alertVPos, 
                        left: 0, 
                        right: 0}}
                >
                    메세지 전송 실패!
                </Alert>
            </Snackbar>
        </PageBox>
        </div>
    )

}

export default ChatRoom