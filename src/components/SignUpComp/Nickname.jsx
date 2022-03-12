import {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import BobButton from 'components/styled/BobButton'
import NormalButton from 'components/styled/NormalButton'
import createNickname from 'utils/create-nickname';
import {useSelector} from 'react-redux'
import { selectBasePath } from 'slices/basePath'
const axios = require('axios');

const Nickname = (props) => {


    const [disabled, setDisabled] = useState(true)
    const basePath = useSelector(selectBasePath)   

    const progressRatio = 20

    const handleNicknameInput = (event) => {
        console.log(props.state)
        props.setState({
            ...props.state,
            [event.target.id]: event.target.value,
        })
    };

    const handleCheckDuplicate = async (event) => {
        event.preventDefault();
        let ret;
        await axios({
            method: 'GET',
            url: basePath.path + process.env.REACT_APP_API_CHECK_NICKNAME,
            params: {
                nickname: props.state.nickname,
            }})
            .then(res => {
                ret = res.data;
                console.log(ret)
            })
            .catch(err => {
                console.log(err);
            });
        props.setState({
            ...props.state,
            nicknameCheck: (ret === 'available' ? true : false),
        });
    };

    const handleNicknameRefresh = (event) => {
        event.preventDefault();
        const recommend = createNickname();
        props.setState({
            ...props.state, 
            nickname: recommend,
            nicknameCheck: null,
        });
    };

    const handleNext = () => {
        props.setState({
            ...props.state,
            pageNum: (props.state.pageNum < 5
                ? props.state.pageNum+1 
                : props.state.pageNum),
            progress: (props.state.progress < 100 
                ? props.state.progress+progressRatio 
                : props.state.progress),
        })
    }

    useEffect( () => {
        if (props.state.nickname.length > 3 && props.state.nicknameCheck === true) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    },[props, setDisabled])

    return (
            <Grid item container
                direction='column'
                sx={{
                    width: '100%',
                    display: 'flex', 
                    p: 2,
                }}
            >
                <Grid item container
                    direction='column' 
                    sx={{
                        width: '100%',
                        pt: 4
                    }}
                >
                    <TextField 
                        error={!props.state.nicknameCheck} 
                        id='nickname' 
                        value={props.state.nickname} 
                        label='닉네임 입력'
                        helperText={(props.state.nicknameCheck === null) 
                                    ? '중복확인 해주세요'
                                    :(!props.state.nicknameCheck) 
                                    ? '닉네임 중복입니다' 
                                    : '사용 가능합니다'
                        }
                        onChange={handleNicknameInput}
                        sx={{width: '100%'}}
                    />
                </Grid>                    
                <Grid item container
                    spacing={1}
                    sx={{
                        width: '100%',
                        pt: 1,
                        display: 'flex',
                        justifyContent: 'flex-start'    
                    }}
                >
                    <Grid item sx={{width: '30%'}}>
                        <NormalButton myColor='#f75910'
                            variant='contained' 
                            onClick={handleCheckDuplicate}
                            disabled={
                                props.state.nickname.length > 3
                                ? false : true
                            }
                            sx={{
                                width: '100%',
                                backgroundColor: '#f75910'
                            }}
                        >
                            <Typography variant='body2'
                                sx={{fontWeight: 'fontWeightBold'}}
                            >
                                중복 확인
                            </Typography>
                        </NormalButton> 
                    </Grid>
                    <Grid item sx={{width: '40%'}}>
                        <NormalButton myColor='#f75910'
                            variant='contained' 
                            onClick={handleNicknameRefresh}
                            sx={{
                                width: '100%',
                                backgroundColor: '#f75910'
                            }}
                        >
                            <Typography variant='body2'
                                sx={{fontWeight: 'fontWeightBold'}}
                            >
                                닉네임 재추천
                            </Typography>
                        </NormalButton>
                    </Grid>
                        
                </Grid>

                <Grid item 
                    sx={{
                        width: '100%',
                        pt: 4
                    }}
                >
                    <BobButton 
                        onClick={handleNext}
                        disabled={disabled}
                        title={'다 음'}
                    />
                </Grid>
            </Grid>
    )
}

export default Nickname;