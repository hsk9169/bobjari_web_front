import {useEffect, useRef, useState} from 'react'
import socketIOClient from 'socket.io-client'
import {selectSessions} from 'slices/session'
import {useSelector} from 'react-redux'

const useChat = (roomId) => {
    
    const session = useSelector(selectSessions)[1].session

    const [rcvMessage, setRcvMessage] = useState([])
    const [response, setResponse] = useState(null) 
    const socketRef = useRef()

    useEffect(() => {
        socketRef.current = socketIOClient('/', {
            query: { roomId },
        })

        socketRef.current.on('connect', () => {
            setResponse(true)
            console.log('socket connected')
        })

        socketRef.current.on('disconnect', () => {
            setResponse(false)
            console.log('socket disconnected')
        })

        socketRef.current.on(process.env.REACT_APP_NEW_CHAT_MESSAGE_EVENT, (message, date) => {
            console.log('rx : ', message, date)
            const incomingMessage = {...message, date: date}
            setRcvMessage((rcvMessage) => [...rcvMessage, incomingMessage])
            setResponse(true)
        })

        socketRef.current.on('error', (err) => {
            console.log(err.stack)
        })
        return () => {
            socketRef.current.close()
        }
    }, [])

    const sendMessage = (messageBody) => {
        socketRef.current.volatile.emit(process.env.REACT_APP_NEW_CHAT_MESSAGE_EVENT, {
            body: messageBody,
            senderId: (session.role === 'mentee' 
                        ? session.mentee.id
                        : session.mentor.id
            ),
        })
    }

    return {rcvMessage, sendMessage, response}
}

export default useChat