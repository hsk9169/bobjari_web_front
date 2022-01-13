import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import { makeStyles } from '@mui/styles';
import { EmojiProvider, Emoji } from 'react-apple-emojis'
import emojiData from 'react-apple-emojis/lib/data.json'
import Search from '@mui/icons-material/Search';
import { v1 as uuid } from 'uuid';
import {saveJWT} from 'utils/handle-jwt'
const axios = require('axios');

const jobs = [
    '광고 기획자',
    '마케터',
    '해외영업',
    '서비스 기획',
    '클라우드 개발자',
    '반도체 연구원',
    '대학 교수',
    '치과 의사',
    '공무원',
];

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 45,
        width: 300,
        padding: '0 30px',
    },
});

const KakaoSignUpInterest = (props) => {

    const classes = useStyles();

    let jobList = [];
    let ref = React.createRef();

    const handleJoin = async (event) => {
        event.preventDefault();
        jobList = ref.current.innerText.split('\n').slice(1);
        console.log(props.location.data.profileImage);
        const req = {
            'email': props.location.data.email,
            'age': props.location.data.age,
            'gender': props.location.data.gender,
            'nickname': props.location.data.nickname,
            'profileImg': {
                'data': props.location.data.profileImage.data,
                'contentType': props.location.data.profileImage.contentType,
            },
            'role': props.location.data.role,
            'interests': jobList,
        }

        axios.post(process.env.REACT_APP_API_USER_JOIN,
            req, { headers: {
                'Content-Type': 'application/json'
                }
            }
        )
            .then(res => {
                console.log(res);
                const tokens = res.data.token;
                if (tokens) {
                    const id = uuid();
                    //props.addSession({ token, id });
                    saveJWT(tokens)
                    props.history.push({
                        pathname: '/profile',
                        data: {
                            email: props.location.data.email,
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    };  

    return (
        <Box 
            sx={{
                px: 2,
                pb: 10,
                margin: 2,
                maxWidth: 400,
                overflow: 'auto',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    pt: 4,
                    pb: 4,
                    margin: 2,
                    maxWidth: 400,
                    overflow: 'auto',
                }}
            >
                <Stack direction='column' spacing={2}>
                    <Typography variant='h5' sx={{ fontWeight: 'fontWeigntMedium' }}>
                        관심 직업
                    </Typography>
                    <Typography variant='subtitle1'>
                        알아보고 싶은 직업이 무엇인가요?
                    </Typography>
                </Stack>
            </Box>

            <Box
                sx={{
                    pt: 4,
                    pb: 15,
                    margin: 2,
                    maxWidth: 400,
                    overflow: 'auto',
                }}
            >
                <Autocomplete
                    multiple
                    id="jobSelect"
                    options={jobs.map((option) => option)}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'flex-end',
                        }}>
                            <Search sx={{ color: 'action.active', mr: 1, my: 0.5}} />
                            <TextField
                                {...params}
                                variant="standard"
                                label="직업명 검색"
                                sx={{
                                    width:230
                                }}
                            />
                        </Box>
                    )}
                    ref={ref} 
                />

            </Box>
            <Button className={classes.root} onClick={handleJoin} sx={{justifyContent: 'center'}}>
                    <Typography variant='h6'>
                        가입완료&nbsp;
                        <EmojiProvider data={emojiData}>
                            <Emoji name="smiling-face-with-sunglasses" width={25} />
                        </EmojiProvider>
                    </Typography>
            </Button>
        </Box>
    );
}

export default KakaoSignUpInterest;