import * as React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import PageBox   from 'components/styled/PageBox'
import BobButton from 'components/styled/BobButton'

const feeOption = [
    '원 / 1시간',
    '식사 대접으로 충분해요',
    '커피 대접으로 충분해요',
]

const Fee = (props) => {

    const progressRatio = 10
    const [fee, setFee] = React.useState((props.state.fee.value ? props.state.fee.value : '0'));

    const handleNext = () => {
        props.setState({
            ...props.state,
            pageNum: (props.state.pageNum < 10
                ? props.state.pageNum+1 
                : props.state.pageNum),
            progress: (props.state.progress < 100 
                ? props.state.progress+progressRatio 
                : props.state.progress),
        })
    }

    const handleSelect = feeSel => () => {
        props.setState({
            ...props.state,
            feeSelect: feeSel,
            fee: (feeSel===0 ? fee : '0'),
        })
    }

    const handleFee = event => {
        props.setState({
            ...props.state,
            fee: event.target.value,
        })
        setFee(event.target.value)
    }


    return (
        <div>
            <PageBox sx={{display:'flex'}}>
                <Stack direction='column' spacing={2} sx={{width:'85%'}}>
                    {feeOption.map((el,idx) => (
                        <Button variant={props.state.feeSelect===idx ? 'contained' : 'outlined'} 
                            onClick={handleSelect(idx)} 
                            sx={{width: '100%', height:60}}
                        >
                            {idx === 0
                                ? <Input
                                    value={fee}
                                    onChange={handleFee}
                                    sx={{width: 80, alignItem:'center',
                                    color: (props.state.feeSelect===0 ? 'white' : 'black')}} 
                                />
                                : null
                            }
                            <Typography variant='subtitle1' 
                                color={props.state.feeSelect===idx ? 'white' : 'black'}
                                sx={{fontWeight: 'fontWeightBold'}}
                            >
                                {el}
                            </Typography>
                        </Button>
                    ))}
                </Stack>
            </PageBox>
            <PageBox sx={{pt: 4, display: 'flex'}}>
                <BobButton title='다 음' onClick={handleNext} />
            </PageBox>
        </div>
    )
}

export default Fee;