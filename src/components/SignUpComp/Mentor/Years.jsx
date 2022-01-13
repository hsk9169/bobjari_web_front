import * as React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import PageBox   from 'components/styled/PageBox'
import BobButton from 'components/styled/BobButton'

const yearsOption = [
    '1 - 3 년차',
    '4 - 6 년차',
    '7 - 9 년차',
    '10 - 12 년차',
    '13 - 15 년차',
    '15 년차 이상',
]

const Fee = (props) => {

    const progressRatio = 10
    const [years, setYears] = React.useState((props.state.years ? props.state.years : 0));

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

    const handleSelect = yearsSel => () => {
        props.setState({
            ...props.state,
            years: yearsSel,
        })
    }

    return (
        <div>
            <PageBox sx={{pt: 4, display:'flex'}}>
                <Stack direction='column' spacing={2} sx={{width:'85%'}}>
                    {yearsOption.map((el,idx) => (
                        <Button variant={props.state.years===idx ? 'contained' : 'outlined'} 
                            onClick={handleSelect(idx)} 
                            sx={{width: '100%', height:60}}
                        >
                            <Typography variant='subtitle1' 
                                color={props.state.years===idx ? 'white' : 'black'}
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