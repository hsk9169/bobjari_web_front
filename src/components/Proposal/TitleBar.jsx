import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBack from '@mui/icons-material/ArrowBackIos';
import ButtonBase from '@mui/material/ButtonBase';

const TitleBar = (props) => {

    return (
        <Grid container
            direction='column'
            sx={{
                p: 2,
                width: '100%'
            }}
        >
            <Grid item container>
                <Grid item
                    sx={{
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'flex-start'
                    }}
                >
                    <ButtonBase>
                        <ArrowBack 
                            sx={{color: '#ffffff'}}
                            onClick={props.onClickBack} 
                        />
                    </ButtonBase>
                </Grid>
                <Grid item
                    sx={{
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                >
                    <ButtonBase>
                        <CancelIcon 
                            sx={{
                                width: '30px',
                                height: '30px',
                                color: '#ffffff'
                            }}
                            onClick={props.onClickClose} 
                        />
                    </ButtonBase>
                </Grid>
            </Grid>

            <Grid item container
                direction='column'
                sx={{p:1, pt:4}}
            >
                {props.title.map(el => (
                    <Grid item>
                        <Typography variant='h5'
                            sx={{
                                fontWeight: 'fontWeightBold',
                                color: '#ffffff'
                            }}
                        >
                            {el}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}

export default TitleBar