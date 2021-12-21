import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

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
                    justifyContent: 'right',
                }}
            >
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