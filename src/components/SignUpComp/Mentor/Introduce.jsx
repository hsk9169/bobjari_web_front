import * as React from 'react'
import TextField from '@mui/material/TextField';
import PageBox from 'components/styled/PageBox'
import BobButtonWithEmoji from 'components/styled/BobButtonWithEmoji'

const helpText = 
    '5년차 IT 커머스 MD입니다. 전공, 현재 직업 등 현재 상황에 맞추어 취업전략을 수립할 수 있습..';


const Introduce = (props) => {


    const [input, setInput] = React.useState('');

    const handleInput = event => {
        props.setState({
            ...props.state,
            introduce: event.target.value
        })
        setInput(event.target.value)
    }


    return (
        <div>
            <PageBox sx={{width:'100%',display: 'flex'}}>
                <TextField 
                    variant="outlined"
                    multiline 
                    rows={10} 
                    placeholder={helpText}
                    onChange={handleInput} 
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