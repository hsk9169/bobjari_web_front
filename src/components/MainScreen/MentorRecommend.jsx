import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ButtonBase from '@mui/material/ButtonBase';
import {RecommendMentor} from 'components/Cards'

const MentorRecommend = (props) => {

    const height = window.innerHeight

    return (
        <>
            <Grid container
                sx={{width: '100%', pt: 2}}
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
                        추천 직업인
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
                            onClick={props.handleMoreRecommend}
                        />
                    </ButtonBase>
                </Grid>
            </Grid>

            <Box component='div'
                sx={{
                    width: '100%',
                    height: height * 0.13,
                    display: 'flex',
                    overflow: 'auto',
                    whiteSpace: 'nowrap'
                }}
            >
                <Stack 
                    direction='row'
                    spacing={2}
                    sx={{
                        margin: 0.5
                    }}
                >
                    {props.mentor.map(el => (
                        <RecommendMentor
                            nickname={el.user.profile.nickname}
                            image={el.user.profile.image}
                            job={el.career.job}
                            company={el.career.company}
                        />
                    ))}
                </Stack>
            </Box>
        </>
    )
}

export default MentorRecommend