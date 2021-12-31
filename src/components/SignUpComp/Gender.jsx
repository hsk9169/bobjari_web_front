import {useState} from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import PageBox from 'components/styled/PageBox'
import BobButton from 'components/styled/BobButton'

const Gender = (props) => {

    const [disabled, setDisabled] = useState(
        (props.state.gender==='' ? true : false)
    )
    const [ state, setState ] = useState({
        maleDisplay: (props.state.gender==='male' ? 'contained' : 'outlined'),
        femaleDisplay: (props.state.gender==='female' ? 'contained' : 'outlined'),
    });

    const progressRatio = 25

    console.log(state)

    const handleMaleDisplay = async () => {
        setState({
            maleDisplay: 'contained',
            femaleDisplay: 'outlined',
        });
        props.setState({
            ...props.state,
            gender: 'male',
        })
        setDisabled(false)
    }

    const handleFemaleDisplay = async () => {
        setState({
            maleDisplay: 'outlined',
            femaleDisplay: 'contained',
        });
        props.setState({
            ...props.state,
            gender: 'female',
        })
        setDisabled(false)
    }

    const handleNext = () => {
        props.setState({
            ...props.state,
            pageNum: (props.state.pageNum < 4 
                ? props.state.pageNum+1 
                : props.state.pageNum),
            progress: (props.state.progress < 100 
                ? props.state.progress+progressRatio 
                : props.state.progress),
        })
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
                    <Button variant={state.maleDisplay} onClick={handleMaleDisplay}
                        sx={{
                            width: '40%', 
                            height: 200
                        }}
                    >
                        <Typography variant='h5' sx={{ fontWeight: 'fontWeightMedium' }}>
                            남성
                        </Typography>
                    </Button>
                    <Button variant={state.femaleDisplay} onClick={handleFemaleDisplay}
                        sx={{
                            width: '40%',
                            height: 200
                        }}
                    >
                        <Typography variant='h5' sx={{ fontWeight: 'fontWeightMedium' }}>
                            여성
                        </Typography>
                    </Button>
                </Stack>
            </PageBox>
            <PageBox sx={{pt: 4, display: 'flex'}}>
                <BobButton title='다 음' onClick={handleNext} disabled={disabled} />
            </PageBox>
        </div>
    )
}

export default Gender;