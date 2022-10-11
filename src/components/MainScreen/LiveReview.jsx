import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ButtonBase from '@mui/material/ButtonBase';
import {LiveReviewCard} from 'components/Cards'

const LiveReview = (props) => {
    
    const height = window.innerHeight

    return (
        <>
            <Grid container
                sx={{width: '100%'}}
            >
                <Grid item 
                    sx={{
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'flex-start'
                    }}
                >
                    <Typography variant='h6'
                        sx={{fontWeight: 'fontWeightBold'}}
                    >
                        실시간 리뷰
                    </Typography>
                </Grid>
                <Grid item
                    sx={{
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                >
                    <ButtonBase>
                        <ArrowForwardIosIcon
                            color='disabled'
                            onClick={props.handleMoreReview}
                        />
                    </ButtonBase>
                </Grid>
            </Grid>

            <Box component='div'
                sx={{
                    width: '100%',
                    height: height * 0.3,
                    display: 'flex',
                    overflow: 'auto',
                    whiteSpace: 'nowrap'
                }}
            >
                <Stack 
                    direction='row'
                    spacing={2}
                    sx={{margin: 0.5}}
                >
                    {props.review.map(el => (
                        <LiveReviewCard
                            mentorNickname={el.mentor.user.profile.nickname}
                            menteeNickname={el.mentee.user.profile.nickname}
                            job={el.mentor.career.job}
                            body={el.body}
                            date={el.createdAt}
                        />
                    ))}
                </Stack>
            </Box>
        </>
    )
}

export default LiveReview