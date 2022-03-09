import {useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import PageBox from 'components/styled/PageBox'
import BobButton from 'components/styled/BobButton'
import createNickname from 'utils/create-nickname';

const axios = require('axios');



const Nickname = (props) => {


    const [disabled, setDisabled] = useState(true)

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
            url: process.env.REACT_APP_API_CHECK_NICKNAME,
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
        <div>
            <PageBox sx={{display: 'flex',p:2}}>
                <Stack direction='column' spacing={2} sx={{width: '90%'}}>
                    <TextField error={!props.state.nicknameCheck} id='nickname' value={props.state.nickname} 
                                label='닉네임 입력'
                                helperText={(props.state.nicknameCheck === null) ? '중복확인 해주세요'
                                           :(!props.state.nicknameCheck) ? '닉네임 중복입니다' : '사용 가능합니다'}
                                onChange={handleNicknameInput}
                                sx={{width: '100%'}}>
                    </TextField>
                    
                    <Stack direction='row' spacing={2}>
                        {(props.state.nickname.length > 3) ? <Button variant='contained' onClick={handleCheckDuplicate}>중복확인</Button> 
                                  : <Button variant='contained' disabled>중복확인</Button>
                        }
                        <Button variant='contained' onClick={handleNicknameRefresh}>닉네임 재추천</Button>
                    </Stack>
                </Stack>
            </PageBox>
            <PageBox sx={{pt: 4, display: 'flex'}}>
                <BobButton title='다 음' onClick={handleNext} disabled={disabled} />
            </PageBox>
        </div>
    )
}

export default Nickname;