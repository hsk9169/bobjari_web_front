import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

export default function StackTitleWithDone(props) {

    return (
        <div>
            <Box sx={{
                    pt: 1,
                    pb: 1,
                    margin: 2,
                    maxWidth: '100%',
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Grid container>
                    <Grid item xs={10.5}>
                        <ButtonBase>
                            <ArrowBackIosIcon color='disabled' onClick={props.onClickBack} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs>
                        <ButtonBase onClick={props.onClickDone}>
                            <Typography variant='h6' 
                                sx={{ 
                                    fontWeight: 'fontWeightMedium',
                                    color: blue[500] 
                                }}
                            >
                                완료
                            </Typography>
                        </ButtonBase>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{
                    pt: 1,
                    pb: 1,
                    px: 2,
                    margin: 2,
                    maxWidth: '100%',
                    display: 'flex',
                }}
            >
                <Grid container direction='column'>
                    {props.title.map(el => (
                        <Grid item>
                            <Typography variant='h5' sx={{ fontWeight: 'fontWeightBold' }}>
                                {el}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box sx={{
                    pt: 1,
                    pb: 1,
                    px: 2,
                    margin: 2,
                    maxWidth: '100%',
                    display: 'flex',
                }}
            >
                <Grid container direction='column'>
                    {props.subtitle.map(el => (
                        <Grid item>
                            <Typography variant='subtitle1' sx={{ fontWeight: 'fontWeightMedium' }}>
                                {el}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );

}