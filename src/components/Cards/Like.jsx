import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import StarIcon from '@mui/icons-material/Star';
const years = require('constants/career-years')

const Like = (props) => {

    const score = (props.rate.score/props.rate.num).toFixed(1)

    return (
        <Paper elevation={2}
            sx={{
                p: 2,
                borderRadius: 3,
                width: '100%',
            }}
            onClick={props.onClick}
        >
            <Grid container>
                <Grid item
                    sx={{
                        width: '20%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Avatar alt='프로필 사진'
                        src={props.image.contentType==='url'
                            ? props.image.data
                            : `data:${props.image.contentType};base64,${props.image.data}`
                        }
                        sx={{ width: 60, height: 60}} 
                    />
                </Grid>

                <Grid item container
                    direction='column'
                    sx={{
                        width: '60%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Grid item container>
                        <Grid item>
                            <Typography variant='body1'
                                sx={{fontWeight: 'fontWeightBold'}}
                            >
                                {props.nickname}&nbsp;&bull;
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='body1'>
                                &nbsp;{props.job}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container>
                        <Grid item>
                            <Typography variant='body2'>
                                {years.yearsList[props.years]}
                                &nbsp;&bull;&nbsp;{props.company}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container>
                        <Grid item>
                            <StarIcon 
                                sx={{
                                    width: 20, 
                                    height: 20, 
                                    color: '#f57c00'
                                }} 
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant='button'>
                                &nbsp;{props.rate.score === 0
                                    ? '0.0' : score}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='button'>
                                &nbsp;({props.rate.num})
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item container
                    direction='column'
                    sx={{
                        width: '20%',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Grid item>
                        <Typography variant='body2'>
                            1시간
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='body1'
                            sx={{fontWeight: 'fontWeightBold'}}
                        >
                            {props.fee.value}원
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Like