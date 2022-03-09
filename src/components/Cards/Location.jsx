import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import LocationIcon from '@mui/icons-material/FmdGood';

const Location = (props) => {

    return (
        <Grid item container
            direction='column'
            sx={{
                p: 1,
                display: 'flex',
                width: '100%',
                border: 2,
                borderRadius: 2,
                borderColor: props.borderColor,
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}
        >
            <Grid item
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <LocationIcon
                    sx={{
                        width: 30, 
                        height: 30,
                        color: '#f57c00'
                    }}
                />
            </Grid>
            <Grid item container
                direction='column'
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start'
                }}
            >
                <Grid item>
                    <Typography variant='body2'
                        sx={{fontWeight: 'fontWeightBold'}}
                    >
                        {props.place}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='subtitle2'>
                        {props.address}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Location