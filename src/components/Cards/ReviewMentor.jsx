import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder'
import {compareDate} from 'utils/handle-datetime'

const ReviewMentor = (props) => {

    const date = compareDate(props.datetime)
    const starFilled = new Array(props.score).fill('')
    const starHollow = new Array(5-props.score).fill('')

    return (
        <Paper elevation={0}
            sx={{
                width: '95%',
                minHeight: 200,
                borderRadius: 2,
                backgroundColor: '#eceff1',
                p: 2,
            }}
        >
            <Grid container direction='column'>
                <Grid item container
                    spacing={2.5}
                    sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <Grid item>
                        <Avatar alt='프로필 사진'
                            src={props.image.contentType==='url'
                                ? props.image.data
                                : `data:${props.image.contentType};base64,${props.image.data}`
                            }
                            sx={{ width: 40, height: 40}} 
                        />
                    </Grid>
                    <Grid item container sx={{width: '80%'}}
                        direction='column'
                    >
                        <Grid item>
                            <Typography variant='body1'
                                sx={{fontWeight: 'fontWeightBold'}}
                            >
                                {props.nickname}
                            </Typography>
                        </Grid>
                        <Grid item container>
                            <Grid item>
                                {starFilled.map(el => (
                                    <StarIcon
                                        sx={{
                                            width: 20,
                                            height: 20,
                                            color: '#f57c00'
                                        }}
                                    />
                                ))}
                                {starHollow.map(el => (
                                    <StarBorderIcon
                                        sx={{
                                            width: 20,
                                            height: 20,
                                            color: '#f57c00'
                                        }}
                                    />
                                ))}
                            </Grid>
                            <Grid item>
                                <Typography variant='caption'>
                                    &nbsp;{date}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sx={{pt: 2}}>
                    <Typography variant='body1'>
                        {props.body}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default ReviewMentor