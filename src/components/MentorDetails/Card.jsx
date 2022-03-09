import {useState, useEffect} from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider'
import LocationIcon from '@mui/icons-material/FmdGoodOutlined';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';

const years = require('constants/career-years')

const Card = (props) => {

    const [days, setDays] = useState()
    const score = (props.rate.score/props.rate.num).toFixed(1)
        
    useEffect(() => {
        if (props.schedule) {
            let ret = ''
            props.schedule.map(el => 
                ret += el.day + ' '
            )
            setDays(ret)
        }
    }, [])

    return (
        <Grid container direction='column'>
            <Grid item container sx={{p: 2}}>
                <Grid item container direction='column'
                    sx={{
                        width: '70%', 
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                    }}
                >
                    <Grid item>
                        <Typography variant='body1'
                            sx={{fontWeight: 'fontWeightBold'}}>
                            {props.job}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='h6'
                            sx={{fontWeight: 'fontWeightBold'}}>
                            {props.nickname}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='subtitle2'>
                            {years.yearsList[props.years]}&nbsp;&bull;&nbsp;{props.company}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item 
                    sx={{
                        width: '30%', 
                        display: 'flex',
                        justifyContent: 'flex-end', 
                        alignItems: 'center',
                    }}
                >
                    <Avatar alt='프로필 사진'
                        src={props.image.contentType==='url'
                            ? props.image.data
                            : `data:${props.image.contentType};base64,${props.image.data}`
                        }
                        sx={{ width: 90, height: 90}} 
                    />
                </Grid>
            </Grid>

            <Grid item container sx={{pt: 1, pb: 2}}>
                <Grid item container direction='column'
                    sx={{
                        width: '25%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Grid item>
                        <LocationIcon 
                            sx={{
                                width: 30, 
                                height: 30, 
                                color: '#f57c00'
                            }} 
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant='button'>
                            {'강남/송파'}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item container direction='column'
                    sx={{
                        width: '25%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Grid item>
                        <EventAvailableIcon 
                            sx={{
                                width: 30, 
                                height: 30, 
                                color: '#f57c00'
                            }} 
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant='button'>
                            {days}
                        </Typography>
                    </Grid>
                </Grid>
                
                <Grid item container direction='column'
                    sx={{
                        width: '25%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Grid item>
                        <StarBorderIcon 
                            sx={{
                                width: 30, 
                                height: 30, 
                                color: '#f57c00'
                            }} 
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant='button'>
                            {props.rate.num === 0
                            ? '0.0' 
                            : score}점({props.rate.num})
                        </Typography>
                    </Grid>
                </Grid>
                
                <Grid item container direction='column'
                    sx={{
                        width: '25%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Grid item>
                        <RiceBowlIcon 
                            sx={{
                                width: 30, 
                                height: 30, 
                                color: '#f57c00'
                            }} 
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant='button'>
                            {props.numBob}회
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item>
                <Divider sx={{width: '100%'}} />
            </Grid>
        </Grid>
    )
}

export default Card