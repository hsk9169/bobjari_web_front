import {useState} from 'react';
import PageBox from 'components/styled/PageBox'
import {getJWT, verifyJWT} from 'utils/handle-jwt'
import {useDispatch} from 'react-redux'
import { updateSessionTime } from 'slices/manage';
import {SearchBar} from 'components/MainScreen'


const axios = require('axios');


const Main = (props) => {

    const dispatch = useDispatch()

    const [mentors, setMentors] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [resultText, setResultText] = useState('')
    const [queryId, setQueryId] = useState(0)
    const [pending, setPending] = useState(false)
    const [isEnd, setIsEnd] = useState(false)
    const numGet = 10;

    const handleSearch = async event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setIsEnd(false)
            if (searchInput === '') {
                setMentors([])
                setResultText('No Result')
                setPending(false)
            } else {
                if (queryId === 0) {
                    await axios.get(process.env.REACT_APP_API_MENTOR_SEARCH,
                        { 
                            params: {
                                keyword: searchInput,
                                startIdx: queryId,
                                num: numGet,
                            },
                        })
                        .then(res => {
                            if (res.data === 'invalid') {
                                let obj = {expireTime: null, remainTime: null}
                                verifyJWT(obj)
                                dispatch(updateSessionTime(obj))
                            } else {
                                if (res.data.length > 0) {
                                    setMentors(res.data)
                                    setQueryId(res.data.length)
                                    setResultText('')
                                } else {
                                    setMentors([])
                                    setResultText('No Result')
                                }
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                } else {
                    setIsEnd(true)
                }
            }
        }
    }

    const infiniteScroll = async () => {
        let scrollHeight = Math.max(
            document.documentElement.scrollHeight, 
            document.body.scrollHeight);
        let scrollTop = Math.max(
            document.documentElement.scrollTop,
            document.body.scrollTop);
        let clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight === scrollHeight) {
            setPending(true)
            if (!isEnd) {
                await axios.get(process.env.REACT_APP_API_MENTORS_GET,
                    { 
                        headers: {
                            Authorization: `Bearer ${getJWT().accessToken}`,
                        },
                        params: {
                            keyword: searchInput,
                            startIdx: queryId,
                            num: numGet,
                        },
                    })
                    .then(res => {
                        setPending(false)
                        if (res.data === 'invalid') {
                            let obj = {expireTime: null, remainTime: null}
                            verifyJWT(obj)
                            dispatch(updateSessionTime(obj))
                        } else {
                            if (res.data.length > 0) {
                                setMentors([...mentors, ...res.data])
                                setQueryId(queryId + res.data.length)
                            } else {
                                setIsEnd(true)
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                setPending(false)
            }
        }
    }

    const handleClickSearch = () => {
        props.history.push('/main/search')
    }
    

    return (
        
        <div>

            <PageBox sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'flex-start',
                    p: 2,
                    pt: 6,
                    background: 'linear-gradient(to bottom, #c5cae9, #fafafa)'
                }}
            >
                <SearchBar
                    handleClickSearch={handleClickSearch}
                />
            </PageBox>
            <PageBox sx={{pb:7}} />
        </div>
    )
}

export default Main;