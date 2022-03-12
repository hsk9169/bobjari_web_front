import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Search from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import {jobs} from 'constants/job-corp-name'
import StackTitle from 'components/styled/StackTitle';
import PageBox from 'components/styled/PageBox'
import BobButton from 'components/styled/BobButton'
import {saveJWT} from 'utils/handle-jwt'
import { useDispatch, useSelector } from "react-redux";
import { addSession } from "slices/session";
import { selectBasePath } from 'slices/basePath'
const axios = require('axios');

const SignUpMentee = ({context, location, history}) => {
    
    let jobList = [];
    let ref = React.createRef();
    const dispatch = useDispatch();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const basePath = useSelector(selectBasePath)   

    const handleJoin = (event) => {
        let formData = new FormData();
        event.preventDefault();
        jobList = ref.current.innerText.split('\n').slice(1);

        
        const req = {
            email: location.data.email,
            age: location.data.age,
            gender: location.data.gender,
            nickname: location.data.nickname,
            role: location.data.role,
            interests: jobList,
        }

        if (location.data.profileImage.contentType === 'url') {
            formData.append(
                'img', 
                JSON.stringify(location.data.profileImage.data),
            );
        } else {
            formData.append(
                'img', 
                location.data.profileImage.file,
            );
        }

        for (let [key, value] of Object.entries(req)) {
            console.log(key, JSON.stringify(value))
            formData.append(key, JSON.stringify(value));
        }

        axios.post(basePath.path + process.env.REACT_APP_API_USER_JOIN,
            formData, { headers: {
                'Content-Type': 'multipart/form-data'
                }
            }
        )
            .then(res => {
                dispatch(addSession(res.data))
                const retEmail = res.data.profile.email;
                if (retEmail === location.data.email) {
                    axios.get(basePath.path + process.env.REACT_APP_API_GET_TOKEN, 
                        { params: {
                            email: retEmail,
                            }
                        })
                        .then(res => {
                            const tokens = res.data.token;
                            saveJWT(tokens)
                            history.push({
                                pathname: '/main',
                                data: {
                                    email: location.data.email,
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
        history.push('/');
    }

    const handleBack = () => {
        const data = {
            email: location.data.email,
            age: location.data.age,
            gender: location.data.gender,
            nickname: location.data.nickname,
            profileImage: location.data.profileImage,
            role: location.data.role,    
        };
        history.push({
            pathname: '/signup',
            data: data
        })
    }

    React.useEffect( () => {
        let active = true;
        if (!loading) {
            return undefined;
        }

        (async () => {
            if (active) {
                setOptions([...jobs]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);


    return (
        <Grid container 
            direction='column'
            sx={{width: '100%'}}
        >
            <Grid item>
                <StackTitle
                    title={['관심 직업']}
                    subtitle={['알아보고 싶은 직업이 무엇인가요?']}
                    onClickBack={handleBack}
                />
            </Grid>
            
            <Grid item
                sx={{
                    p: 2,
                    pt: 2,
                    display: 'flex',
                    width: '100%',
                }}
            >
                <Autocomplete
                    multiple
                    id="jobSelect"
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    options={options}
                    freeSolo
                    loading
                    loadingText='검색 중...'
                    renderTags={(value, getTagProps) => 
                        value.map((option, index) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                        <PageBox sx={{ 
                            display: 'flex', 
                            alignItems: 'flex-end',
                            overflow: 'auto'
                        }}>
                            <Search sx={{ color: 'action.active', mr: 1, my: 0.5}} />
                            <TextField
                                {...params}
                                variant="standard"
                                label="직업명 검색"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    width:'inherit'
                                }}
                            />
                        </PageBox>
                    )}
                    ref={ref} 
                    sx={{width: '100%'}}
                />
            </Grid>

            <Grid item 
                sx={{
                    width: '100%',
                    p: 2,
                    pt: 4
                }}
            >
                <BobButton 
                    onClick={handleJoin}
                    disabled={false}
                    title={'가입 완료'}
                />
            </Grid>
        </Grid>
        
    );
}

export default SignUpMentee;