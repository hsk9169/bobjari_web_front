import {useState, useEffect} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import PageBox from 'components/styled/PageBox'
import {SearchCard} from 'components/Cards'
import {getJWT, verifyJWT} from 'utils/handle-jwt'
const axios = require('axios');

const Main = ({context}) => {

    context.setBotNav(true)

    const [mentors, setMentors] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [resultText, setResultText] = useState('')
    const [queryId, setQueryId] = useState(0)
    const [pending, setPending] = useState(false)
    const [isEnd, setIsEnd] = useState(false)
    const numGet = 10;

    const handleSearchInput = event => {
        setSearchInput(event.target.value)
        setQueryId(0)
    }

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
                            if (res.data === 'invalid') {
                                verifyJWT(context)
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
                            verifyJWT(context)
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

    useEffect( () => {
        window.addEventListener('scroll', infiniteScroll)
        return () => window.removeEventListener('scroll', infiniteScroll)
    })
    

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
                <Grid container direction='column' spacing={4}>
                    <Grid item>
                        <Typography variant='h4' sx={{fontWeight: 'fontWeightBold'}}>
                            천리길도<br/>밥자리부터
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Paper elevation={1}
                            sx={{
                                margin: 0.5,
                                p: 1,
                                width: 'inherit',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Grid container spacing={1}>
                                <Grid item>
                                    <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5}} />
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        fullWidth
                                        variant='standard'
                                        InputProps={{ disableUnderline: true }}
                                        placeholder='다른 직업인 둘러보기'
                                        value={searchInput}
                                        onChange={handleSearchInput}
                                        onKeyPress={handleSearch}
                                        sx={{
                                            width:'100%',
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </PageBox>
            <PageBox sx={{
                display: 'flex',
                width: '100%',
                p: 2,
                }}
            >
                <Grid direction='column' container spacing={2}>
                    <Grid item>
                        <Typography variant='caption'>
                            {resultText}
                        </Typography>
                    </Grid>
                    {mentors.map(el => (
                        <Grid item>
                            <SearchCard 
                                userInfo={el.userInfo} 
                                profileImg={el.profileImg} 
                                careerInfo={el.careerInfo}
                                appointment={el.appointment}
                            />
                        </Grid>
                    ))}
                    {pending 
                    ?<Grid item 
                        sx={{
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                        }}
                    >
                        <CircularProgress sx={{color: 'text.secondary'}}/> 
                    </Grid> 
                    : null}
                </Grid>
            </PageBox>
            <PageBox sx={{pb:7}} />
        </div>
    )
}

export default Main;