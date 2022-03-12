import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import PageBox from 'components/styled/PageBox'
import Stack from '@mui/material/Stack'
import {getJWT} from 'utils/handle-jwt'
import {selectSessions} from 'slices/session'
import {selectBasePath} from 'slices/basePath'
import {LikeSkeleton, LikeCard} from 'components/Cards'
import NoList from './NoList'
const axios = require('axios')


const Like = (props) => {

    const history = useHistory()
    const session = useSelector(selectSessions)[1].session
    const [initialized, setInitialized] = useState(false)
    const [likeList, setLikeList] = useState([])

    const numSkeleton = new Array(3).fill('')

    const basePath = useSelector(selectBasePath)   

    const handleClickSearch = () => {
        history.push('/main/search')
    }

    const handleClickLike = idx => {
        history.push(`/main/mentor/${likeList[idx].mentor.id}`)
    }

    useEffect(() => {
        async function getLikeList() {
            if (!initialized) {
                await axios.get(basePath.path + process.env.REACT_APP_API_LIKE,
                    {
                        headers: {
                            Authorization: `Bearer ${getJWT().accessToken}`,
                        },
                        params: {
                            menteeId: session.mentee.id
                        },
                    })
                    .then(res => {
                        console.log(res.data)
                        setLikeList(res.data)
                        setInitialized(true)
                    })
            }
        }

        getLikeList()
    }, [])

    return (
        <>
        <PageBox sx={{display: 'flex'}}>
            <Stack 
                spacing={2}
                sx={{
                    p: 1,
                    width: '100%', 
                    display: 'flex', 
                    justifyContent:'center'
                }}
            >
                {!initialized
                    ? numSkeleton.map( el => (
                        <LikeSkeleton />
                    ))
                    : 
                    likeList.length > 0
                    ?
                        likeList.map( (el,idx) => (
                            <LikeCard
                                image={el.mentor.user.profile.image}
                                nickname={el.mentor.user.profile.nickname}
                                job={el.mentor.career.job}
                                company={el.mentor.career.company}
                                years={el.mentor.career.years}
                                rate={el.mentor.metadata.rate}
                                fee={el.mentor.details.preference.fee}
                                onClick={() => {
                                    handleClickLike(idx)
                                }}
                            />
                        ))
                    :
                        <NoList 
                            title='찜한 밥자리가 없습니다.'
                            onClick={handleClickSearch}
                        />
                }
            </Stack>
            
        </PageBox>
        <PageBox sx={{pb:7}} />
        </>
    )
}

export default Like;