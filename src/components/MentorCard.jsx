import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { red } from '@mui/material/colors';
import StarRateIcon from '@mui/icons-material/StarRate';

export default function Bobjari() {
    const [state, setState] = React.useState({
        imgUrl: 'https://w.namu.la/s/28027c57126faed6ad2426677a122ac53864e9fca93d64442af454a4bb397c3ac6467f258f151f0bb19b3c8b91609ae7cc8ab888a9b235670622ef1cb1fbc6df56bfd6011ccdef1401fb8ce52739c8e9fc85a22f858fdfd891e8b8522d4647c4',
        nickname: '밥자리개발자',
        career: '서버 개발자',
        company: 'TEAM BOB',
    });
  
    return (
      <Box component='div'
            sx={{
                maxwidth: 400,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper 
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
                    <Box
                      sx={{
                          width:'inherit',
                          alignItems: 'center',
                          display: 'flex',
                        }}
                    >
                        <Grid container spacing={3} direction='row'
                            sx={{alignItems: 'center'}}>
                            <Grid item>
                                <Typography variant='h6' 
                                    sx={{ fontWeight: 'fontWeightBold' }}
                                >
                                    {state.nickname}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='subtitle1' 
                                    sx={{ fontWeight: 'fontWeightMedium' }}
                                >
                                    "{state.career}"
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item>
                    <Box
                        sx={{
                            maxWidth:400,
                            alignItems: 'center',
                            display: 'flex',
                        }}
                    >
                        <Grid container sx={{alignItems:'center'}}>
                            <Grid item xs={3}>
                                <Avatar alt="프로필 사진" src={state.imgUrl} 
                                    sx={{ width: 60, height: 60 }} />
                            </Grid>
                            <Grid item xs={5.7} >
                                <Typography variant='subtitle1' 
                                    sx={{ fontWeight: 'fontWeightBold' }}
                                >
                                    3년차 {state.company}
                                </Typography>
                                <Grid container direction='row' sx={{alignItems: 'center'}}>
                                    <Grid item>
                                        <StarRateIcon sx={{width:18,height:18,color:red[500]}}/>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='caption text' sx={{fontWeight: 'fontWeightBold'}}>
                                            4.5
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='caption text'>
                                            (15)
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={0}>
                                <Divider orientation='vertical' variant='fullWidth'
                                flexItem sx={{minHeight: 70 }}/>
                            </Grid>
                            <Grid item xs={0.7} />
                            <Grid item xs={2.5} sx={{alignItems: 'center'}} >
                                <Box sx={{
                                    height:'100%',
                                    alignItems:'center', justifyContent: 'center',
                                    display: 'flex',
                                    maxWidth: '100%',
                                }}
                                >
                                    <Stack direction='column'
                                        sx={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            display: 'flex'}}
                                    >
                                        <Typography variant='caption text' color='text.secondary'>
                                            시간 당
                                        </Typography>
                                        <Typography variant='BUTTON TEXT' sx={{fontWeight: 'fontWeightBold'}}>
                                            2.5 만원
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item>
                    <Box
                        sx={{
                            pt: 0.5,
                            maxWidth:400,
                            alignItems: 'center',
                            display: 'flex',
                        }}
                    >
                        <Grid container direction='row' spacing={1}>
                            <Grid item>
                                <Chip label="직업 이점" variant="outlined" />
                            </Grid>
                            <Grid item>
                                <Chip label="하루 일과" variant="outlined" />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
      </Box>
      
    );
  }