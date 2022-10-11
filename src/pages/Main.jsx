import {useState, useEffect} from 'react'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import {
    BobjariGuide, 
    SearchBar,
    MentorRecommend,
    LiveReview,
    TopSearch,
    UpcomingBob,
    BulletinBoard
} from 'components/MainScreen'
import PageBox from 'components/styled/PageBox'
import slogan from 'contents/slogan.png'
import {useSelector} from 'react-redux'
import { selectBasePath } from 'slices/basePath'
import { selectSessions } from 'slices/session'
const axios = require('axios')


const Main = (props) => {

    const sessions = useSelector(selectSessions)
    const session = sessions.length > 1
                    ? sessions[1].session : null

    const height = window.innerHeight

    const [mentor, setMentor] = useState([])
    const [review, setReview] = useState([])
    const basePath = useSelector(selectBasePath)
    
    const handleClickSearch = () => {
        props.history.push('/main/search')
    }
    
    const handleMoreRecommend = () => {
        console.log('more recommend')
    }

    const handleMoreReview = () => {
        console.log('more review')
    }

    useEffect(() => {
        async function getRecommendedMentor() {
            await axios.get(basePath.path + process.env.REACT_APP_API_MENTOR_RECOMMEND,
                {
                    params: {
                        num: 5,
                    },
                })
                .then(res => {
                    setMentor(res.data)
                    console.log('rcmd mentor', res.data);
                })
                .catch(err => {
                    console.log(err)
                })
        }

        async function getRecentReview() {
            await axios.get(basePath.path + process.env.REACT_APP_API_REVIEW_RECENT,
                {
                    params: {
                        num: 5,
                    },
                })
                .then(res => {
                    setReview(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }

        if (session !== null && 
            session.role === 'mentor') 
        {
            console.log('mentor')
        } else {
            getRecommendedMentor()
            getRecentReview()
        }

    },[])

    return (
        <>
        <Stack
            direction='column'
            spacing={2}
            sx={{
                width: '100%',
                p: 2,
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}
        >
            <TopSearch 
                role={session !== null 
                    ? session.role : null} 
                handleClickSearch={handleClickSearch}
            />

            <Grid container
                sx={{width: '100%'}}
            >
                <Grid item>
                    <Box component='img'
                        src={slogan}
                        alt='slogan' 
                        sx={{
                            position: 'relative',
                            left: 0,
                            width: '70%'
                        }}
                    />
                </Grid>
            </Grid>

            <BobjariGuide 
                role={session !== null 
                    ? session.role : null} 
            />
            
            {session !== null && session.role === 'mentor'
                ?
                    <UpcomingBob />
                :
                <>
                    <SearchBar
                        handleClickSearch={handleClickSearch}
                    />
                    <MentorRecommend 
                        mentor={mentor}
                        handleMoreRecommend={handleMoreRecommend}
                    />
                    <LiveReview
                        review={review}
                        handleMoreReview={handleMoreReview}
                    />
                </>
            }
        </Stack>
        <Box sx={{
            height: height*0.1,
        }}/>
        </>
    )
}

export default Main;