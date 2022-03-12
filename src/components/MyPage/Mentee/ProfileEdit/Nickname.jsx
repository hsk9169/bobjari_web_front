import {useState} from 'react'
import PageBox from 'components/styled/PageBox'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import createNickname from 'utils/create-nickname';
import {useSelector} from 'react-redux'
import {selectBasePath} from 'slices/basePath'
const axios = require('axios');


const NicknameEdit = (props) => {

    const [state, setState] = useState({
        nickname: props.nickname,
        nicknameCheck: true,

    })
    const basePath = useSelector(selectBasePath)   


    const handleNicknameInput = (event) => {
        setState({            
            nickname: event.target.value,
            nicknameCheck: null
        })
    };

    const handleNicknameRefresh = (event) => {
        event.preventDefault();
        const recommend = createNickname();
        setState({
            ...state, 
            nickname: recommend,
            nicknameCheck: null,
        });
    };

    const handleCheckDuplicate = async (event) => {
        event.preventDefault();
        let ret;
        await axios({
            method: 'POST',
            url: basePath.path + process.env.REACT_APP_API_CHECK_NICKNAME,
            data: {
                nickname: state.nickname,
            }})
            .then(res => {
                ret = res.data;
                console.log(ret)
            })
            .catch(err => {
                console.log(err);
            });
        setState({
            ...state,
            nicknameCheck: (ret === 'available' ? true : false),
        });
    };

    const handleEdit = () => {
        
    }

    return (
        <PageBox sx={{display: 'flex',p:2}}>
            <Stack direction='column' spacing={2} sx={{width: '90%'}}>
                <TextField error={!state.nicknameCheck} id='nickname' value={state.nickname} 
                            label='닉네임 입력'
                            helperText={(state.nicknameCheck === null) ? '중복확인 해주세요'
                                       :(!state.nicknameCheck) ? '닉네임 중복입니다' : '사용 가능합니다'}
                            onChange={handleNicknameInput}
                            sx={{width: '100%'}}>
                </TextField>
                
                <Stack direction='row' spacing={2}>
                    {(state.nickname.length > 3) 
                        ? <Button variant='contained' onClick={handleCheckDuplicate}>중복확인</Button> 
                        : <Button variant='contained' disabled>중복확인</Button>
                    }
                    <Button variant='contained' onClick={handleNicknameRefresh}>닉네임 재추천</Button>
                </Stack>
                <Button variant='outlined' 
                    disabled={!state.nicknameCheck} 
                    onClick={handleEdit}
                    sx={{height: 60}}>
                    닉네임 변경
                </Button>
            </Stack>
        </PageBox>
    )
}

export default NicknameEdit