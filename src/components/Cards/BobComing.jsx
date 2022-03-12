import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from '@mui/icons-material/FmdGood';

const BobComing = (props) => {

    return (
        <Grid container
            direction='column'
            sx={{
                width: '100%',
                backgroundColor: '#f5f5f5',
                borderRadius: 3
            }}
        >
            <Grid item
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start'
                }}
            >
                <Typography variant='body1'>
                    {props.nickname}
                </Typography>
            </Grid>

            <Grid item container
                sx={{width: '100%'}}
            >
                <Grid item
                    sx={{
                        width: '10%',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}
                >
                    <TimeIcon
                        sx={{
                            width: 25,
                            height: 25,
                            color: '#ffd54f'
                        }}
                    />
                </Grid>
                <Grid item
                    sx={{
                        width: '10%',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}
                >
                    <Typography variant='body1'>
                    </Typography>
                </Grid>
                
            </Grid>

            <Grid item container
                sx={{width: '100%'}}
            >
                <Grid item
                    sx={{
                        width: '10%',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}
                >
                    <PlaceIcon
                        sx={{
                            width: 25,
                            height: 25,
                            color: '#ffd54f'
                        }}
                    />
                </Grid>
                <Grid item
                    sx={{
                        width: '10%',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}
                >
                    <Typography variant='body1'>
                    </Typography>
                </Grid>
                
            </Grid>
        </Grid>
    )
}

export default BobComing