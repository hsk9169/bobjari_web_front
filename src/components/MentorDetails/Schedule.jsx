import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

const Schedule = (props) => {

    return (
        <Grid container 
            direction='column' sx={{pt: 1}}>
            <Grid item container 
                direction='column' sx={{p:2}}
            >
                <Grid item>
                    <Typography variant='h6'
                        sx={{fontWeight: 'fontWeightBold'}}
                    >
                        일정
                    </Typography>
                </Grid>
                <Grid item container
                    direction='column' sx={{pt: 1}}>
                    {props.schedule.map(el => (
                        <Grid item>
                            <Typography variant='body1'>
                                {el.day}&nbsp;{el.startTime}&nbsp;~&nbsp;{el.endTime}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            
            <Grid item sx={{pt: 1}}>
                <Divider sx={{width: '100%'}} />
            </Grid>
        </Grid>
    )
}

export default Schedule