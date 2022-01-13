import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

const Home = props => {
    const [ state, setState ] = useState({
        gotData: false,
        users: [],
    })


    useEffect( () => {
        if (!state.gotData) {
            const req = {
                'email': 'hsk9169@gmail.com',
            };
            axios.get(process.env.REACT_APP_API_USERS_GET,
                { headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            })
                .then(res => {
                    setState({
                        gotData: true,
                        users: res.data,
                    })
                    console.log(state);
                })
                .catch(err => {
                    console.log(err);
                });
            
        }
    });

    return (
        <div>
              <h1>Search result</h1>
              {state.users.map(user => (
                <div>
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
                        <Avatar alt="프로필 사진" src={user.profileImg.data} sx={{ width: 80, height: 80 }} />
                    </Grid>
                    <Grid item xs={7} container>
                        <Grid item container direction="column">
                            <Grid item>
                                <Typography gutterBottom variant="h6">
                                    {user.userInfo.nickname}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    관심직업 
                                </Typography>
                                {user.userInfo.interests.map(element => (
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
            </div>
              ))}
        </div>
    );
}

export default Home;