import * as React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import BobButton from 'components/styled/BobButton'
import NormalButton from 'components/styled/NormalButton'
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
                {yearsList.map((el,idx) => (
                    <Grid item
                        sx={{
                            width: '100%',
                            pb: 2,
                        }}
                    >
                        <NormalButton myColor='#f75910'
                            variant={props.state.years===idx 
                                ? 'contained' : 'outlined'} 
                            onClick={handleSelect(idx)} 
                            sx={{
                                width: '100%', 
                                height:60,
                                backgroundColor: props.state.years===idx
                                    ? '#f75910' : '#ffffff',
                                borderColor: '#000000'
                            }}
                        >
                            <Typography variant='body1' 
                                color={props.state.years===idx 
                                    ? 'white' : 'black'}
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
                    pt: 2
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