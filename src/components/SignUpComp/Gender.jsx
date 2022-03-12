import {useState} from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import BobButton from 'components/styled/BobButton'
import NormalButton from 'components/styled/NormalButton'


const Gender = (props) => {

    const height = window.innerHeight

    const [disabled, setDisabled] = useState(
        (props.state.gender==='' ? true : false)
    )
    const [ state, setState ] = useState({
        maleDisplay: (props.state.gender==='male' ? 'contained' : 'outlined'),
        femaleDisplay: (props.state.gender==='female' ? 'contained' : 'outlined'),
    });

    const progressRatio = 20

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
            pageNum: (props.state.pageNum < 5
                ? props.state.pageNum+1 
                : props.state.pageNum),
            progress: (props.state.progress < 100 
                ? props.state.progress+progressRatio 
                : props.state.progress),
        })
    }


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
                sx={{
                    width: '100%',
                    pt: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Grid item 
                    sx={{
                        width: '50%',
                        p: 1
                    }}
                >
                    <NormalButton myColor='#f75910'
                        variant={state.maleDisplay} 
                        onClick={handleMaleDisplay}
                        sx={{
                            width: '100%', 
                            height: height * 0.3,
                            backgroundColor: props.state.gender === 'male'
                                ? '#f75910' : '#ffffff',
                            borderColor: '#000000',
                        }}
                    >
                        <Typography variant='h5'
                            sx={{
                                fontWeight: 'fontWeightBold',
                                color: props.state.gender === 'male'
                                ? '#ffffff' : '#000000'
                            }}
                        >
                            남성
                        </Typography>
                    </NormalButton>
                </Grid>
                <Grid item 
                    sx={{
                        width: '50%',
                        p: 1
                    }}
                >
                    <NormalButton myColor='#f75910' 
                        variant={state.femaleDisplay} 
                        onClick={handleFemaleDisplay}
                        sx={{
                            width: '100%', 
                            height: height * 0.3,
                            backgroundColor: props.state.gender === 'female'
                                ? '#f75910' : '#ffffff',
                            borderColor: '#000000'
                        }}
                    >
                        <Typography variant='h5' 
                            sx={{
                                fontWeight: 'fontWeightBold',
                                color: props.state.gender === 'female'
                                ? '#ffffff' : '#000000'
                            }}
                        >
                            여성
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

export default Gender;