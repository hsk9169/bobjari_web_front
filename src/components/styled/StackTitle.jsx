import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


const StackTitle = (props) => {


    return (
        <Grid container
            direction='column'
            sx={{
                pt: 2,
                width: '100%',
                display: 'flex',
            }}
        >
            <Grid item container
                sx={{
                    width: '100%', 
                    height: 50,
                    p: 2,
                }}
            >
                <ButtonBase>
                    <ArrowBackIosIcon 
                        color='disabled' 
                        onClick={props.onClickBack} 
                    />
                </ButtonBase>
            </Grid>

            <Grid item container 
                direction='column'
                sx={{
                    width: '100%',
                    p: 2,
                }}
            >
                {props.title.map(el => (
                    <Grid item>
                        <Typography variant='h5' 
                            sx={{ fontWeight: 'fontWeightBold' }}>
                            {el}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            
            {props.subtitle.length>0
                ?
                    <Grid item container 
                        direction='column'
                        sx={{
                            width: '100%',
                            p: 2,
                            display: 'flex',
                            alignItems: 'flex-start'
                        }}
                    >
                        {props.subtitle.map(el => (
                            <Grid item>
                                <Typography variant='subtitle1' 
                                    sx={{ fontWeight: 'fontWeightMedium' }}>
                                    {el}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                : null
            }
        </Grid>

    );

}

export default StackTitle