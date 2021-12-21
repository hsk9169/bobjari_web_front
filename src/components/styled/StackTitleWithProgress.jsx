import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import { red } from '@mui/material/colors';



export default function StackTitleWithProgress(props) {


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
                <ButtonBase>
                    <ArrowBackIosIcon color='disabled' onClick={props.onClickBack} />
                </ButtonBase>

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
            <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={props.progress}
                    sx={{ color: red[300] }} />
            </Box>
            {props.subtitle.length>0
                ?<Box sx={{
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
                : null
            }
        </div>
    );

}