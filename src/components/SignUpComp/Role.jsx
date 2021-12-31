import {useState} from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import PageBox from 'components/styled/PageBox'
import BobButtonWithEmoji from 'components/styled/BobButtonWithEmoji'

const Gender = (props) => {

    const [disabled, setDisabled] = useState(
        (props.state.role==='' ? true : false)
    )
    const [ state, setState ] = useState({
        menteeDisplay: (props.state.role==='mentee' ? 'contained' : 'outlined'),
        mentorDisplay: (props.state.role==='mentor' ? 'contained' : 'outlined'),
    });
    
    const handleMenteeDisplay = async () => {
        setState({
            menteeDisplay: 'contained',
            mentorDisplay: 'outlined',
        });
        props.setState({
            ...props.state,
            role: 'mentee',
        })
        setDisabled(false)
    }

    const handleMentorDisplay = async () => {
        setState({
            menteeDisplay: 'outlined',
            mentorDisplay: 'contained',
        });
        props.setState({
            ...props.state,
            role: 'mentor',
        })
        setDisabled(false)
    }


    return (
        <div>
            <PageBox sx={{display: 'flex',p:2}}>
                <Stack direction='row' spacing={4} 
                    sx={{ 
                        width: 'inherit', 
                        justifyContent: 'center'
                    }}
                >
                    <Button variant={state.menteeDisplay} onClick={handleMenteeDisplay}
                        sx={{
                            width: '40%', 
                            height: 200
                        }}
                    >
                        <Typography variant='h5' sx={{ fontWeight: 'fontWeightMedium' }}>
                            예비<br/>직업인
                        </Typography>
                    </Button>
                    <Button variant={state.mentorDisplay} onClick={handleMentorDisplay}
                        sx={{
                            width: '40%',
                            height: 200
                        }}
                    >
                        <Typography variant='h5' sx={{ fontWeight: 'fontWeightMedium' }}>
                            직업인
                        </Typography>
                    </Button>
                </Stack>
            </PageBox>
            <PageBox sx={{pt: 4, display: 'flex'}}>
                <BobButtonWithEmoji title='가입하기' emoji='partying-face' onClick={props.onClick} disabled={disabled} />
            </PageBox>
        </div>
    )
}

export default Gender;