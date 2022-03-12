import React from 'react';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
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
            <Grid item
                sx={{
                    width: '80%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}
            >
                <div style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: '140%'
                }}>
                    <b style={{
                        fontSize: '16px',
                        color: '#000000'
                    }}>
                        {props.nickname}
                        &nbsp;&bull;&nbsp;
                    </b>
                    <span style={{
                        fontSize: '16px',
                        color: '#000000'
                    }}>
                        {props.job}
                    </span>
                    <br/>
                    <span style={{
                        fontSize: '14px',
                        color: '#000000'
                    }}>
                        {years.yearsList[props.years]}
                        &nbsp;&bull;&nbsp;{props.company}
                     </span>
                    <br/>
                    <StarIcon 
                        sx={{
                            width: 20, 
                            height: 20, 
                            color: '#f57c00'
                        }} 
                    />
                    <span style={{
                        fontSize: '14px',
                        color: '#000000'
                    }}>
                        &nbsp;{props.rate.score === 0
                        ? '0.0' : score}
                        &nbsp;({props.rate.num})
                    </span>
                    
                </div>
            </Grid>
        </Grid>
    );
}

export default ProposeCard;