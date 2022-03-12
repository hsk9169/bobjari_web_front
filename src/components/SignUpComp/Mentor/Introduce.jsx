import * as React from 'react'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import BobButton from 'components/styled/BobButton'

const helpText = 
    '5년차 IT 커머스 MD입니다. 전공, 현재 직업 등 현재 상황에 맞추어 취업전략을 수립할 수 있습..';


const Introduce = (props) => {


    const [input, setInput] = React.useState(props.state.introduce);

    const handleInput = event => {
        if (input.length < 300) {
            if (event.target.value.length > 300) {
                const value = event.target.value.slice(0,299)
                props.setState({
                    ...props.state,
                    introduce: value
                })
                setInput(value)
            } else {
                props.setState({
                    ...props.state,
                    introduce: event.target.value
                })
                setInput(event.target.value)
            }
        } else {}  
    }

    const handleBackspace = event => {
        if (event.keyCode === 8) {
            if (input.length >= 300) {
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
                    helperText={input.length+'/300자'}
                    multiline 
                    rows={10} 
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
                    onClick={props.clickJoin}
                    disabled={false}
                    title={'가입 완료'}
                />
            </Grid>
        </Grid>
    )
}

export default Introduce;