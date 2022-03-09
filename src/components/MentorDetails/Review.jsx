
import SwipeableViews from 'react-swipeable-views'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import StarIcon from '@mui/icons-material/Star';
import {ReviewMentee} from 'components/Cards'

const Review = (props) => {

    const score = (props.rate.score/props.rate.num).toFixed(1)

    return (
        <Grid container
            direction='column'
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                maxWidth: '100%'
            }}
        >
            <Grid item container
                sx={{
                    p: 2,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Grid item
                    sx={{
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'flex-start'
                    }}
                >
                    <Grid item container spacing={1}>
                        <Grid item>
                            <StarIcon 
                                sx={{
                                    width: 20,
                                    height: 20,
                                    color: '#ffb300'
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant='h6'
                                sx={{fontWeight: 'fontWeightBold'}}
                            >
                                {props.rate.num === 0
                                ? '0.0' : score}&nbsp;&bull;
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='h6'
                                sx={{fontWeight: 'fontWeightBold'}}
                            >
                                후기&nbsp;{props.rate.num}개
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item 
                    sx={{
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                >
                    <Link onClick={props.onClickGetMore}>
                        <Typography variant='body1'
                            sx={{fontWeight: 'fontWeightBold'}}
                        >
                            더 보기
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
            
            <Grid item>
                <SwipeableViews 
                    style={{
                        paddingLeft: '5%', paddingRight: '10%'
                    }}
                >                    
                    {props.review.map(el => (
                        <ReviewMentee
                            datetime={el.createdAt}
                            image={el.mentee.user.profile.image}
                            nickname={el.mentee.user.profile.nickname}
                            score={el.score}
                            body={el.body}
                        />
                    ))}
                </SwipeableViews>
            </Grid>
        </Grid>
    )
}

export default Review