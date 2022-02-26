import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import PageBox from 'components/styled/PageBox'
import Stack from '@mui/material/Stack'
import {getJWT} from 'utils/handle-jwt'
import {selectSessions} from 'slices/session'
import {BobSkeleton, BobMessage} from 'components/Cards'
import NoBob from './NoBob'
const axios = require('axios')

const Chat = (props) => {
    
    const history = useHistory()
    const session = useSelector(selectSessions)[1].session
    const [initialized, setInitialized] = useState(false)
    const [bobjariList, setBobjariList] = useState([])
    const [lineExceeded, setLineExceeded] = useState([])

    const numSkeleton = new Array(3).fill('')

    console.log(bobjariList)

    useEffect(() => {
        async function getBobjariList() {
            if (!initialized) {
                const api = session.role === 'mentee'
                            ? process.env.REACT_APP_API_BOBJARI_MENTEE
                            : process.env.REACT_APP_API_BOBJARI_MENTOR
                const param = session.role === 'mentee'
                            ? {menteeId: session.mentee.id}
                            : {mentorId: session.mentor.id}
                await axios.get(api,
                    {
                        headers: {
                            Authorization: `Bearer ${getJWT().accessToken}`,
                        },
                        params: param,
                    })
                    .then(res => {
                        const bobjariList = res.data
                        setBobjariList(bobjariList)
                        let array=[]
                        bobjariList.map(el => {
                            let first=false, second=false, num=0
                            if (el.mentor.career !== undefined && 
                                el.mentor.career.job !== null) {
                                if (el.mentor.career.job.length
                                    + el.mentor.user.profile.nickname.length
                                    > 17) {
                                        first = true
                                        num = el.mentor.career.job.length
                                            + el.mentor.user.profile.nickname.length
                                            - 17
                                }
                            }
                            if (el.chat !== null) {
                                if (el.chat.message.length > 19) second = true
                            }
                            array = [...array, {
                                firstLine: {
                                    exceeded: first,
                                    num: num,
                                },
                                secondLine: second,
                            }]
                        })
                        setLineExceeded(array)   
                        setInitialized(true)
                    })
            }
        }
        getBobjariList()
    }, [])

    return (
        <PageBox sx={{display: 'flex'}}>
            <Stack sx={{width: '100%', display: 'flex', justifyContent:'center'}}>
            {!initialized
                ? numSkeleton.map( el => (
                    <BobSkeleton />
                ))
                : 
                bobjariList.length > 0
                ?
                    bobjariList.map( (el,idx) => (
                        <BobMessage
                            role={session.role}
                            image={session.role === 'mentee'
                                    ? el.mentor.user.profile.image
                                    : el.mentee.user.profile.image}
                            nickname={session.role === 'mentee'
                                    ? el.mentor.user.profile.nickname
                                    : el.mentee.user.profile.nickname}
                            job={session.role === 'mentee' ? el.mentor.career.job : null}
                            lastMessage={el.chat !== null ? el.chat.message : null}
                            bobjariStatus={el.status}
                            lastUpdated={el.updatedAt}
                            lineExceeded={lineExceeded[idx]}
                            handleClick={() => {
                                history.push({
                                    pathname: '/room',
                                    data: {
                                        roomInfo: el,
                                    }
                                })
                            }}
                        />
                    ))
                :
                    <NoBob title='진행 중인 밥자리가 없습니다.' />
            }
            </Stack>
        </PageBox>
    )
}

export default Chat