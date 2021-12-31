import React, { useState } from 'react';
import { addSession } from '../actions/index';
import { connect } from 'react-redux';
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
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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

const mapDispatchToProps = dispatch => {
    return {
        addSession: session => dispatch(addSession(session)),
    };
};

const mapStateToProps = state => {
    return {
        api: state.api,
    };
};

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

const SignUpInterestComp = (props) => {

    const classes = useStyles();

    let jobList = [];
    let ref = React.createRef();
    
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleJoin = (event) => {
        let formData = new FormData();
        event.preventDefault();
        jobList = ref.current.innerText.split('\n').slice(1);
        const req = {
            email: props.location.data.email,
            age: props.location.data.age,
            gender: props.location.data.gender,
            nickname: props.location.data.nickname,
            role: props.location.data.role,
            interests: jobList,
        }

        formData.append('img', props.location.data.profileImage.data);
        for (let [key, value] of Object.entries(req)) {
            formData.append(key, value);
        }

        axios.post(process.env.REACT_APP_API_MENTEE_JOIN,
            formData, { headers: {
                'Content-Type': 'multipart/form-data'
                }
            }
        )
            .then(res => {
                const retEmail = res.data;
                if (retEmail === props.location.data.email) {
                    console.log('request getting token');
                    axios.get(process.env.REACT_APP_API_GET_TOKEN, 
                        { params: {
                            email: retEmail,
                            }
                        })
                        .then(res => {
                            const token = res.data.token;
                            localStorage.setItem("accessToken", token.accessToken);
                            localStorage.setItem("refreshToken", token.refreshToken);
                            props.history.push({
                                pathname: '/bobjari',
                                data: {
                                    email: props.location.data.email,
                                }
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        })
                } else {
                    setDialogOpen(true);
                }
                    
                
            })
            .catch(err => {
                console.log(err);
            });        
    };  

    const handleDialogButton = () => {
        setDialogOpen(false);
        props.history.push('/welcome');
    }

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
            <Dialog
                open={dialogOpen}
                onClose={handleDialogButton}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'가입 도중 에러 발생'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        죄송합니다 에러가 발생했네요 :( 다시 시도해주세요..ㅠㅠ
                    </DialogContentText>
                    <Button onClick={handleDialogButton}>홈으로 돌아가기</Button>
                </DialogContent>
            </Dialog>
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
                    <Typography variant='h5' sx={{ fontWeight: 'fontWeightMedium' }}>
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

const SignUpInterest = connect(mapStateToProps, mapDispatchToProps)(SignUpInterestComp);

export default SignUpInterest;