import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import StarIcon from '@mui/icons-material/Star';
const years = require('constants/career-years')

const ProposeCard = (props) => {

    const score = (props.rate.score/props.rate.num).toFixed(1)
  
    return (
        <Grid container
            sx={{
                p: 2,
                with: '100%'
            }}
        >
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
        </Grid>
    );
}

export default ProposeCard;