import * as React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import BobButton from 'components/styled/BobButton'
import NormalButton from 'components/styled/NormalButton'

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
        <Grid item container
            direction='column'
            sx={{
                width: '100%',
                display: 'flex', 
                p: 2,
            }}
        >
            <Grid item container
                direction='column'
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                {feeOption.map((el,idx) => (
                    <Grid item
                        sx={{
                            width: '100%',
                            pb: 2
                        }}
                    >
                        <NormalButton myColor='#f75910'
                            variant={props.state.feeSelect===idx 
                                ? 'contained' : 'outlined'} 
                            onClick={handleSelect(idx)} 
                            sx={{
                                width: '100%', 
                                height:60,
                                backgroundColor: props.state.feeSelect===idx
                                    ? '#f75910' : '#ffffff',
                                borderColor: '#000000'
                            }}
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
                        </NormalButton>
                    </Grid>
                ))}
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

export default Fee;