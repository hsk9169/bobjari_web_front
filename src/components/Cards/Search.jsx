import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { red, grey } from '@mui/material/colors';
import StarRateIcon from '@mui/icons-material/StarRate';
import PageBox from 'components/styled/PageBox'
import {topicList} from 'constants/topics'
import {yearsList} from 'constants/career-years'


const SearchCard = ({userInfo, careerInfo, profileImg, appointment}) => {

    return (
        <Paper elevation={3}
            sx={{
              p: 2,
              width: 'inherit',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 3,
            }}
        >
            <Grid container direction='column'>
                <Grid item>
                    <Grid container sx={{alignItems:'center'}}>
                        <Grid item xs={3}>
                            <Avatar alt="프로필 사진" 
                                src={profileImg.contentType==='url'
                                    ? profileImg.data
                                    : `data:${profileImg.contentType};base64,${profileImg.data}`
                                } 
                                sx={{ width: 70, height: 70 }} />
                        </Grid>
                        <Grid item xs={5.5} container direction='column'
                            sx={{alignItems:'left'}}
                        >
                            <Grid item>
                                <Typography variant='subtitle1' 
                                    sx={{ fontWeight: 'fontWeightBold' }}
                                >
                                    {userInfo.nickname} &#183; {careerInfo.job}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='subtitle2' 
                                    sx={{ fontWeight: 'fontWeightBold' }}
                                >
                                    {yearsList[careerInfo.years]} &#183; {careerInfo.company}
                                </Typography>
                            </Grid>
                            <Grid item container direction='row'
                                sx={{alignItems: 'flex-end'}}
                            >
                                <Grid item xs={1.3}>
                                    <StarRateIcon sx={{width:15,height:15,color:red[500]}}/>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Typography color='text.secondary' variant='subtitle2'>
                                        4.3
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography color='text.secondary' variant='subtitle2'>
                                        (15)
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3.5} sx={{
                            height: '100%',
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
                                    {appointment.fee.value}원
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item sx={{pb:1}}>
                    <PageBox sx={{
                        height:30, bgcolor: grey[200], 
                        display:'flex', justifyContent: 'flex-start',
                        borderRadius: 3,
                        }}
                    >
                        <Typography variant='subtitle2' 
                            sx={{pl: 1, pr: 1, fontWeight: 'fontWeightBold'}}
                        >
                            {careerInfo.title}
                        </Typography>
                    </PageBox>
                </Grid>
                <Grid item>
                    <PageBox
                        sx={{
                            pt: 0.5,
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