import * as React from 'react'
import TextField from '@mui/material/TextField';
import PageBox from 'components/styled/PageBox'
import BobButton from 'components/styled/BobButton'

const helpText = 
    '누구보다 업계를 잘 아는 IT 전문가\n#세부분야 #프레임워크 #핵심업무\n#나만의 경험';


const HashTag = (props) => {

    const progressRatio = 11;

    const [input, setInput] = React.useState('');

    const handleInput = event => {
        props.setState({
            ...props.state,
            hashtag: event.target.value
        })
        setInput(event.target.value)
    }

    const handleNext = () => {
        props.setState({
            ...props.state,
            pageNum: (props.state.pageNum < 9 
                ? props.state.pageNum+1 
                : props.state.pageNum),
            progress: (props.state.progress < 100 
                ? props.state.progress+progressRatio 
                : props.state.progress),
        })
    }



    return (
        <div>
            <PageBox sx={{width:'100%',display: 'flex'}}>
                <TextField 
                    variant="outlined"
                    multiline 
                    rows={5} 
                    placeholder={helpText}
                    onChange={handleInput} 
                    sx={{width: '85%'}}
                />
            </PageBox>
            <PageBox sx={{pt: 4, display: 'flex'}}>
                <BobButton title='다 음' onClick={handleNext} />
            </PageBox>
        </div>
    )
}

export default HashTag;