import {useState, useEffect} from 'react'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import {
    BobjariGuide, 
    SearchBar,
    MentorRecommend,
    LiveReview
} from 'components/MainScreen'
import slogan from 'contents/slogan.png'
const axios = require('axios')


const Main = (props) => {

    const height = window.innerHeight

    const [mentor, setMentor] = useState([])
    const [review, setReview] = useState([])

    const handleClickSearch = () => {
        props.history.push('/main/search')
    }
    
    const handleMoreRecommend = () => {
        console.log('more recommend')
    }

    const handleMoreReview = () => {
        console.log('more review')
    }

    useState(() => {
        async function getMentor() {
            await axios.get(process.env.REACT_APP_API_)
        }
    },[])

    return (
        <Stack
            direction='column'
            spacing={2}
            sx={{
                p: 2,
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
                position: 'absolute',
                top: height * 0.05,
                bottom: height * 0.07,
            }}
        >
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
            
            <BobjariGuide />

            <SearchBar
                handleClickSearch={handleClickSearch}
            />

            <MentorRecommend 
                handleMoreRecommend={handleMoreRecommend}
            />

            <LiveReview
                handleMoreReview={handleMoreReview}
            />
            
        </Stack>
    )
}

export default Main;