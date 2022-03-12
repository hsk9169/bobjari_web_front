import * as React from 'react'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import BobButton from 'components/styled/BobButton'

const helpText = 
    '누구보다 업계를 잘 아는 IT 전문가\n#세부분야 #프레임워크 #핵심업무\n#나만의 경험';


const HashTag = (props) => {

    const progressRatio = 10;

    const [input, setInput] = React.useState(props.state.title);
    console.log(input)

    const handleInput = event => {
        if (input.length < 30) {
            if (event.target.value.length > 30) {
                setInput(event.target.value.slice(0,29))
            } else {
                setInput(event.target.value)
            }
            
        } else {}
    }

    const handleNext = () => {
        props.setState({
            ...props.state,
            title: input,
            pageNum: (props.state.pageNum < 10
                ? props.state.pageNum+1 
                : props.state.pageNum),
            progress: (props.state.progress < 100 
                ? props.state.progress+progressRatio 
                : props.state.progress),
        })
    }

    const handleBackspace = event => {
        if (event.keyCode === 8) {
            if (input.length >= 30) {
                setInput(event.target.value.slice(0,-1))
            }
        }
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
            <Grid item
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <TextField 
                    value={input}
                    variant="outlined"
                    helperText={input.length+'/30자'}
                    multiline 
                    rows={3} 
                    placeholder={helpText}
                    onChange={handleInput} 
                    onKeyUp={handleBackspace}
                    sx={{width: '100%'}}
                />
            </Grid>

            <Grid item 
                sx={{
                    width: '100%',
                    pt: 4
                }}
            >
                <BobButton 
                    onClick={handleNext}
                    disabled={false}
                    title={'다 음'}
                />
            </Grid>
        </Grid>
    )
}

export default HashTag;