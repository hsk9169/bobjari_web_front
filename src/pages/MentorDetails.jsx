import {useState, useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Grid from '@mui/material/Grid'
import PageBox from 'components/styled/PageBox'
import {getJWT, verifyJWT} from 'utils/handle-jwt'
import {selectSessions} from 'slices/session'
import {selectBasePath} from 'slices/basePath'
import {TopBar, Card, Introduce, Topic, Schedule,
        Place, Review, Propose} from 'components/MentorDetails'
import {updateLoginAlert} from 'slices/manage'
const axios = require('axios')
const years = require('constants/career-years')

const MentorDetails = (props) => {

    

    const dispatch = useDispatch()
    const mentorId = props.match.params.id

    const topBarRef = useRef()

    const sessions = useSelector(selectSessions)
    const session = sessions.length === 1
                    ? null
                    : sessions[1].session
    const basePath = useSelector(selectBasePath)

    const [mentor, setMentor] = useState(null)
    const [topBarHeight, setTopBarHeight] = useState(null)
    const [bottomHeight, setBottomHeight] = useState(null)
    const [like, setLike] = useState(false)
        
    const handleClickBack = () => {
        props.history.goBack()
    }

    const handleClickLike = async () => {
        let obj = {expireTime: null, remainTime: null}
        verifyJWT(obj)
        if (obj.remainTime > 0) {
            setLike(null)
            const data = {
                menteeId: session.mentee.id,
                mentorId: mentor.id,
            }
        
            await axios({
                headers: {
                    Authorization: `Bearer ${getJWT().accessToken}`,
                },
                url: basePath.path + process.env.REACT_APP_API_LIKE,
                method: like ? 'DELETE' : 'POST',
                data: data
            })
                .then(res => {
                    if (res) setLike(!like)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            dispatch(updateLoginAlert(true))
        }
    }

    const handleClickShare = () => {
        const copyElement = document.createElement('textarea')
        copyElement.value = window.location.href
        document.body.appendChild(copyElement)
        copyElement.focus()
        copyElement.select()
        document.execCommand('copy')
        document.body.removeChild(copyElement)
        alert('클립보드에 복사되었습니다.')
    }

    const handleGetMoreReview = () => {
        console.log('more')
    }

    const handlePropose = () => {
        props.history.push({
            pathname: '/propose',
            data: {
                schedule: mentor.details.preference.schedule,
                location: mentor.details.preference.location,
                fee: mentor.details.preference.fee,
                menteeId: session.mentee.id,
                mentorId: mentor.id,
                mentorProfile: {
                    nickname: mentor.user.profile.nickname,
                    image: mentor.user.profile.image,
                    job: mentor.career.job,
                    years: mentor.career.years,
                    company: mentor.career.company,
                    rate: mentor.metadata.rate,
                }
            }
        })
    }


    useEffect( () => {
        async function start() {
            await axios.get(basePath.path + process.env.REACT_APP_API_MENTOR,
                {
                    params: {
                        menteeId: session === null
                                ? null : session.mentee.id,
                        mentorId: mentorId,
                    }
                })
                .then(res => {
                    setLike(res.data[1])
                    setMentor(res.data[0])
                })
                .catch(err => {
                    console.log(err)
                })
        }

        start()
        if (topBarRef.current != null) {
            setTopBarHeight(topBarRef.current.clientHeight)
        }
    }, [])

    return (
        <>
            <Grid container direction='column' sx={{width: '100%'}}>
                <Grid item ref={topBarRef}>
                    <TopBar 
                        session={session}
                        like={like}
                        setTopBarHeight={setTopBarHeight}
                        onClickBack={handleClickBack}
                        onClickLike={handleClickLike}
                        onClickShare={handleClickShare}
                    />
                </Grid>
                <Grid item>
                    <PageBox sx={{
                        pt: 2,
                        pb: 10,
                        position: 'absolute',
                        top: topBarHeight,
                        bottom: bottomHeight,
                        width: '100%',
                    }}>
                        <Grid container direction='column'>
                            <Grid item>
                                {mentor ?
                                <Card
                                    job={mentor.career.job}
                                    nickname={mentor.user.profile.nickname}
                                    company={mentor.career.company}
                                    years={mentor.career.years}
                                    image={mentor.user.profile.image}
                                    schedule={mentor.details.preference.schedule}
                                    rate={mentor.metadata.rate}
                                    numBob={mentor.metadata.numBobjari}
                                />
                                : null}
                            </Grid>
                            <Grid item>
                                {mentor ?
                                <Introduce
                                    title={mentor.title}
                                    introduce={mentor.details.introduce}
                                />
                                : null}
                            </Grid>
                            <Grid item>
                                {mentor ?
                                <Topic
                                    topic={mentor.career.topics}
                                />
                                : null}
                            </Grid>
                            <Grid item>
                                {mentor ?
                                <Schedule
                                    schedule={mentor.details.preference.schedule}
                                />
                                : null}
                            </Grid>
                            <Grid item>
                                {mentor ?
                                <Place
                                    location={mentor.details.preference.location}
                                />
                                : null}
                            </Grid>
                            <Grid item>
                                {mentor ?
                                <Review
                                    rate={mentor.metadata.rate}
                                    review={mentor.review} 
                                    onClickGetMore={handleGetMoreReview}
                                />
                                : null}
                            </Grid>
                        </Grid>
                    </PageBox>
                </Grid>

                <Grid item>
                    {mentor ? 
                    <Propose 
                        session={session}
                        onClickPropose={handlePropose}
                        setBottomHeight={setBottomHeight}
                        fee={mentor.details.preference.fee} /> 
                    : null}
                </Grid>
            </Grid>
        </>
    )
}

export default MentorDetails