import * as React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PageBox   from 'components/styled/PageBox'
import BobButton from 'components/styled/BobButton'
import {yearsList} from 'constants/career-years'

const Fee = (props) => {

    const progressRatio = 10

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
                    {yearsList.map((el,idx) => (
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