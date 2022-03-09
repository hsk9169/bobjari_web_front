import {useEffect, useRef, useState} from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import {ChatSend, ChatRecv} from 'components/ChatRoom'
import {selectSessions} from 'slices/session'
import {useSelector} from 'react-redux'


const Messages = (props) => {

    const session = useSelector(selectSessions)[1].session
    const messageRef = useRef(null)
    const [height, setHeight] = useState(null)
    const [arraySize, setArraySize] = useState({
        chatList: 0,
        rcvMessage: 0,
    })

    const scrollAction = () => {
        if (arraySize.rcvMessage !== props.rcvMessage.length) {
            // go to bottom
            setHeight(messageRef.current.scrollHeight)
            messageRef.current.scrollTop = 
                messageRef.current.scrollHeight - messageRef.current.clientHeight
            setArraySize({...arraySize, rcvMessage: props.rcvMessage.length})
        } else if (props.chatList !== null) {
            if (arraySize.chatList !== props.chatList.length) {
                // fix at button
                messageRef.current.scrollTop = 
                    messageRef.current.scrollHeight - height
                setHeight(messageRef.current.scrollHeight)
                setArraySize({...arraySize, chatList: props.chatList.length})
            }
        }
    }

    const handleScroll = () => {
        if (messageRef.current.scrollTop === 0) {
            props.getMoreMessages()
        }
    }


    useEffect(() => {
        scrollAction()
    }, [props.chatList, props.rcvMessage])


    


    const renderChatList = (el) => {
        let time
        time = new Date(el.createdAt).toLocaleString().split('. ')[3].slice(0,-3)

        if ((session.role === 'mentee' && 
            el.author === session.mentee.id) ||
            (session.role === 'mentor' && 
            el.author === session.mentor.id)) 
        {
            return (
                <Box 
                    sx={{
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'flex-end'
                    }}
                >
                    <ChatSend
                        message={el.message}
                        time={time}
                    />
                </Box>
            )
        } else {
            return (
                <Box 
                    sx={{
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'flex-start'
                    }}
                >
                    <ChatRecv
                        image={session.role === 'mentee'
                                ? props.roomInfo.mentor.user.profile.image
                                : props.roomInfo.mentee.user.profile.image}
                        message={el.message}
                        time={time}
                    />
                </Box>
            )
        }        
    }

    const renderChat = (el) => {
        const time = new Date(el.date).toLocaleString().split('. ')[3].slice(0,-3)
        
        if ((session.role === 'mentee' && 
            el.senderId === session.mentee.id) ||
            (session.role === 'mentor' && 
            el.senderId === session.mentor.id)) 
        {
            return (
                <Box 
                    sx={{
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'flex-end'
                    }}
                >
                    <ChatSend
                        message={el.body}
                        time={time}
                    />
                </Box>
            )
        } else {
            return (
                <Box 
                    sx={{
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'flex-start'
                    }}
                >
                    <ChatRecv
                        image={session.role === 'mentee'
                                ? props.roomInfo.mentor.user.profile.image
                                : props.roomInfo.mentee.user.profile.image}
                        message={el.body}
                        time={time}
                    />
                </Box>
            )
        }
    }
    
    return (
        <div>
        <List
            ref={messageRef}
            onScroll={handleScroll}
            sx={{position: 'absolute', 
                top: props.topPosition,
                width: '100%',
                maxHeight: props.height,
                overflow: 'auto'
            }}
        >
        {props.chatList === null
        ?   <ListItem>
                <Box sx={{
                    width: '100%', 
                    height: props.height,
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <CircularProgress size={50} thickness={5}
                        sx={{color: '#f75910'}} />
                </Box>
            </ListItem>
        :
            <div>
            <ListItem>
                <Box sx={{
                    width: '100%', 
                    display: 'flex', 
                    justifyContent: 'center',
                    pt: 0.5,
                }}>
                    {props.isPending === null
                    ? 
                        <Chip label='대화목록 처음' />
                    : props.isPending === true
                    ?
                        <CircularProgress size={20} thickness={2} />
                    :
                        null
                    }
                </Box>
            </ListItem>
            </div>
            
        }
        {props.chatList !== null 
        ?props.chatList.map( el => 
            <ListItem>
                {renderChatList(el)}
            </ListItem>
        ) : null}
        {props.rcvMessage.map( el => (
            <ListItem>
                {renderChat(el)}
            </ListItem>
        ))}
        </List>
        </div>
    )
}

export default Messages