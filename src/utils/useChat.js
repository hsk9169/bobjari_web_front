import {useEffect, useRef, useState} from 'react'
import socketIOClient from 'socket.io-client'
import {selectSessions} from 'slices/session'
import {useSelector} from 'react-redux'

const useChat = (roomId) => {
    
    const session = useSelector(selectSessions)[1].session

    const [messages, setMessages] = useState([])
    const socketRef = useRef()

    useEffect(() => {
        socketRef.current = socketIOClient(process.env.REACT_APP_SOCKET_SERVER_URL, {
            query: { roomId },
        })

        socketRef.current.on(process.env.REACT_APP_NEW_CHAT_MESSAGE_EVENT, message => {
            console.log('rx : ', message)
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === session.profile.nickname,
            }
            setMessages(messages => [...messages, incomingMessage])
        })
        return () => {
            socketRef.current.disconnect()
        }
    }, [roomId, session])

    const sendMessage = (messageBody) => {
        socketRef.current.emit(process.env.REACT_APP_NEW_CHAT_MESSAGE_EVENT, {
            body: messageBody,
            senderId: session.profile.nickname,
        })
    }

    return {messages, sendMessage}
}

export default useChat