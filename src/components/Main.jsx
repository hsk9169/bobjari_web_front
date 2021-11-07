import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { red } from '@mui/material/colors';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import axios from 'axios';

const mapStateToProps = state => {
  return {
      session: state.session,
  };
}

const MainComponent = props => {

    const [ state, setState ] = useState({
        gotData: false,
        email: '',
        imgUrl: '',
        nickname: '',
        interests: [],
    })

    useEffect( () => {
        if (!state.gotData) {
            axios.get(process.env.REACT_APP_API_JWT_TEST,
                { headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            })
                .then(res => {
                    let imgUrl;
                    if (res.data.profileImg.contentType === 'url') {
                        imgUrl = res.data.profileImg.data;
                    } else {
                        imgUrl = 
                        `data:${res.data.profileImg.contentType};base64,${res.data.profileImg.data}`;
                    }
                    setState({
                        email: res.data.userInfo.email,
                        imgUrl: imgUrl,
                        nickname: res.data.userInfo.nickname,
                        interests: res.data.userInfo.interests,
                        gotData: true,
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }
        console.log(state);
    });

    return (
        <Paper variant='elevation' sx={{
                pt:2,
                pb:2,
                p:2,
                display: 'flex',
                margin: 2,
                maxWidth: 400,
                justifyContent:'center',
                alignItems: 'center',
            }}
        >
            <Grid container spacing={3}>
                <Grid item>
                    <Avatar alt="프로필 사진" src={state.imgUrl} sx={{ width: 80, height: 80 }} />
                </Grid>
                <Grid item xs={7} container>
                    <Grid item container direction="column">
                        <Grid item>
                            <Typography gutterBottom variant="h6">
                                {state.nickname}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                관심직업 
                            </Typography>
                            {state.interests.map(element => (
                                <Typography variant="body2" color="text.secondary">
                                    - {element}
                                </Typography>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1} container sx={{
                    justifyContent:'center',
                    alignItems: 'center',
                }}>
                    <ButtonBase>
                        <KeyboardArrowRightIcon color="disabled" />
                    </ButtonBase>
                </Grid>
            </Grid>
        </Paper>   
  );
}

const Main = connect(mapStateToProps)(MainComponent);

export default Main;