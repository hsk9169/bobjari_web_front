import {useState} from 'react'
import PageBox from 'components/styled/PageBox'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const GenderEdit = (props) => {

    const [ state, setState ] = useState({
        maleDisplay: (props.gender==='남성' ? 'contained' : 'outlined'),
        femaleDisplay: (props.gender==='여성' ? 'contained' : 'outlined'),
        gender: props.gender
    });

    const handleMaleDisplay = () => {
        setState({
            maleDisplay: 'contained',
            femaleDisplay: 'outlined',
            gender: '남성',
        })
    }

    const handleFemaleDisplay = () => {
        setState({
            maleDisplay: 'outlined',
            femaleDisplay: 'contained',
            gender: '여성'
        });
    }

    const handleEdit = () => {
        
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
            <PageBox sx={{display:'flex',p:2}}>
                <Button variant='outlined' 
                    onClick={handleEdit}
                    sx={{height: 60, width: '100%'}}>
                    성별 변경
                </Button>
            </PageBox>
        </div>
    )
}

export default GenderEdit