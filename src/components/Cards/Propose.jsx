import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { red, grey } from '@mui/material/colors';
import StarRateIcon from '@mui/icons-material/StarRate';
import PageBox from 'components/styled/PageBox'

const ProposeCard = ({mentorInfo}) => {
  
    return (
        <Paper elevation={3}
            sx={{
              margin: 1,
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
                            <Avatar alt="프로필 사진" src={mentorInfo.profileImg} 
                                sx={{ width: 70, height: 70 }} />
                        </Grid>
                        <Grid item xs={5.5} container direction='column'
                            sx={{alignItems:'left'}}
                        >
                            <Grid item>
                                <Typography variant='subtitle1' 
                                    sx={{ fontWeight: 'fontWeightBold' }}
                                >
                                    {mentorInfo.nickname} &#183; {mentorInfo.job}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='subtitle2' 
                                    sx={{ fontWeight: 'fontWeightBold' }}
                                >
                                    {mentorInfo.career} &#183; {mentorInfo.company}
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
                                        {mentorInfo.rate}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography color='text.secondary' variant='subtitle2'>
                                        ({mentorInfo.numReview})
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
                                <Typography variant='BUTTON TEXT' 
                                    sx={{fontWeight: 'fontWeightBold'}}>
                                    {mentorInfo.fee}원
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <PageBox sx={{display: 'flex'}}>
                            <Button sx={{
                                bgcolor: grey[200], 
                                borderRadius: 2,
                                width: '50%',
                                height: 50,
                                margin: 0.5,
                                }}
                            >
                                <Typography variant='button' color='black'>
                                    신청내역 보기
                                </Typography>
                            </Button>
                            <Button sx={{
                                bgcolor: grey[200], 
                                borderRadius: 2,
                                width: '50%',
                                height: 50,
                                margin: 0.5,
                                }}
                            >
                                <Typography variant='button' color='black'>
                                    직업인 응답 보기
                                </Typography>
                            </Button>
                    </PageBox>
                </Grid>
            </Grid>
        </Paper>      
    );
}

export default ProposeCard;