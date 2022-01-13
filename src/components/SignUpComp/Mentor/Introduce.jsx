import * as React from 'react'
import TextField from '@mui/material/TextField';
import PageBox from 'components/styled/PageBox'
import BobButtonWithEmoji from 'components/styled/BobButtonWithEmoji'

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
        <div>
            <PageBox sx={{width:'100%',display: 'flex'}}>
                <TextField 
                    value={input}
                    variant="outlined"
                    helperText={input.length+'/300자'}
                    multiline 
                    rows={10} 
                    placeholder={helpText}
                    onChange={handleInput} 
                    onKeyUp={handleBackspace}
                    sx={{width: '85%'}}
                />
            </PageBox>
            <PageBox sx={{pt: 4, display: 'flex'}}>
                <BobButtonWithEmoji emoji='party-popper' title='가입 완료' onClick={props.clickJoin} />
            </PageBox>
        </div>
    )
}

export default Introduce;