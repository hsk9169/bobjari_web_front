import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import {BobComing} from 'components/Cards'

const UpcomingBob = (props) => {

    return (
        <Grid container
            direction='column'
            sx={{width: '100%', pt: 1}}
        >
            <Grid item 
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start'
                }}
            >
                <Typography variant='h6'
                    sx={{fontWeight: 'fontWeightBold'}}
                >
                    임박한 밥자리
                </Typography>
            </Grid>
            
            <Grid item
                sx={{width: '100%'}}
            >
                <BobComing />
            </Grid>
        </Grid>
    )
}

export default UpcomingBob