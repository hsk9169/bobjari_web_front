import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import {LocationCard} from 'components/Cards'

const Place = (props) => {

    return (
        <Grid container direction='column'>
            <Grid item container 
                direction='column'
                sx={{pt: 1}}
            >
                <Grid item sx={{margin: 2}}>
                    <Typography variant='h6'
                        sx={{fontWeight: 'fontWeightBold'}}
                    >
                        장소
                    </Typography>
                </Grid>
                <Grid item container 
                    sx={{width: '100%', p:1}}
                >
                    {props.location.map(el => (
                        <Grid item 
                            sx={{
                                width: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                p: 1, 
                            }}
                        >
                            <LocationCard
                                borderColor='#000000'
                                place={el.place_name}
                                address={el.address_name}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            
            <Grid item sx={{pt: 3}}>
                <Divider sx={{width: '100%'}} />
            </Grid>
        </Grid>
    )
}

export default Place