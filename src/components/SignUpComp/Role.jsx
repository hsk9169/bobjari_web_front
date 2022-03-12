import {useState} from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import BobButton from 'components/styled/BobButton'
import NormalButton from 'components/styled/NormalButton'


const Gender = (props) => {

    const height = window.innerHeight

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
                        variant={state.menteeDisplay} 
                        onClick={handleMenteeDisplay}
                        sx={{
                            width: '100%', 
                            height: height * 0.3,
                            backgroundColor: props.state.role === 'mentee'
                                ? '#f75910' : '#ffffff',
                            borderColor: '#000000',
                        }}
                    >
                        <Typography variant='h5' 
                            sx={{ 
                                fontWeight: 'fontWeightBold',
                                color: props.state.role === 'mentee'
                                ? '#ffffff' : '#000000'
                            }}
                        >
                            예비<br/>직업인
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
                        variant={state.mentorDisplay} 
                        onClick={handleMentorDisplay}
                        sx={{
                            width: '100%', 
                            height: height * 0.3,
                            backgroundColor: props.state.role === 'mentor'
                                ? '#f75910' : '#ffffff',
                            borderColor: '#000000',
                        }}
                    >
                        <Typography variant='h5' 
                            sx={{ 
                                fontWeight: 'fontWeightBold',
                                color: props.state.role === 'mentor'
                                ? '#ffffff' : '#000000'
                            }}
                        >
                            직업인
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
                    onClick={props.onClick}
                    disabled={disabled}
                    title={'가입하기'}
                />
            </Grid>
        </Grid>
    )
}

export default Gender;