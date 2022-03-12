import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { red } from '@mui/material/colors';
import StarRateIcon from '@mui/icons-material/StarRate';
import PageBox from 'components/styled/PageBox'
import {topicList} from 'constants/topics'
import {yearsList} from 'constants/career-years'


const SearchCard = ({nickname, careerInfo, profileImg, 
                    fee, title, rate, onClick}) => {

    return (
        <Paper elevation={2}
            sx={{
              p: 2,
              borderRadius: 3,
              width: '100%',
            }}
            onClick={onClick}
        >
            <Grid container direction='column'>
                <Grid item sx={{pb: 1}}>
                    <Grid container sx={{alignItems:'center'}}>

                        <Grid item sx={{width: '22%'}}>
                            <Avatar alt="프로필 사진" 
                                src={profileImg.contentType==='url'
                                    ? profileImg.data
                                    : `data:${profileImg.contentType};base64,${profileImg.data}`
                                } 
                                sx={{ width: 60, height: 60 }} />
                        </Grid>

                        <Grid item
                            sx={{
                                display: 'flex',
                                alignItems:'left',
                                width: '55%'
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
                                    color: '#000000',
                                }}>
                                    {nickname}
                                    &nbsp;&bull;&nbsp;
                                    {careerInfo.job}
                                </b>
                                <br/>
                                <b style={{
                                    fontSize: '14px',
                                    color: '#000000',
                                }}>
                                    {yearsList[careerInfo.years]}
                                    &nbsp;&bull;&nbsp;
                                    {careerInfo.company}
                                </b>
                                <br/>
                                <StarRateIcon 
                                    sx={{
                                        width:15,
                                        height:15,
                                        color:red[500]
                                    }}
                                />
                                <span style={{
                                    fontSize: '14px',
                                    color: '#9e9e9e',
                                }}>
                                    {rate.num === 0 ? '0.0'
                                    : (rate.score/rate.num).toFixed(1)}
                                    &nbsp;{`(${rate.num})`}
                                </span>
                            </div>
                        </Grid>
                        <Grid item 
                            sx={{
                                width: '23%',
                                display: 'flex',
                                alignItems: 'flex-end',
                                justifyContent:'flex-end',
                            }}
                        >
                            <Stack direction='column'
                                sx={{
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Typography variant='subtitle2' color='text.secondary'>
                                    1시간
                                </Typography>
                                <Typography variant='BUTTON TEXT' sx={{fontWeight: 'fontWeightBold'}}>
                                    {fee.value}원
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item 
                    sx={{
                        pl: 1, pr: 1,
                        width: '100%',
                        height: 30, 
                        bgcolor: '#eeeeee', 
                        display:'flex', 
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        borderRadius: 3,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <div
                        style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        <b style={{
                            fontSize: '15px',
                            color: '#000000'
                        }}>
                            {title}
                        </b>
                    </div>
                </Grid>
                <Grid item>
                    <PageBox
                        sx={{
                            pt: 2,
                            width: 'inherit',
                            display: 'flex',
                        }}
                    >
                        <Grid container direction='row' spacing={1}
                            sx={{alignItems: 'center', display: 'flex'}}>
                            {careerInfo.topics.map((el, idx) => {
                                if (idx < 3) {
                                    return (
                                        <Grid item>
                                            <Chip label={topicList[el]} 
                                                variant="outlined" 
                                                sx={{fontWeight: 'fontWeightBold'}}/>
                                        </Grid>
                                    )
                                } else {
                                    return (null)
                                }
                            })}
                            {careerInfo.topics.length > 3 
                                ?<Grid item>
                                    <Typography variant='subtitle1' color='text.secondary'>
                                        +{careerInfo.topics.length - 3}
                                    </Typography>
                                </Grid>
                                : null        
                            }
                        </Grid>
                    </PageBox>
                </Grid>
            </Grid>
        </Paper>      
    );
}

export default SearchCard;