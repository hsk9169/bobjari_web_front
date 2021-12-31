import Paper from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import ArrowForward from '@mui/icons-material/ArrowForwardIos';



export default function ItemListPaper(props) {

    return (
        <Paper elevation={0}
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                pb: 1,
                pt: 1,
            }}
        >
            <Grid container sx={{
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Grid item xs={11} container direction='column'>
                    <Grid item>
                        <Box>
                            <Typography variant='caption text'
                                sx={{
                                    fontSize:'14px'
                                }}>
                                {props.title}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box sx={{p:0.5}}>
                            <Typography variant='h6'>
                                {props.body}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs>
                    <ButtonBase onClick={props.onClick}>
                        <ArrowForward color='disabled' />
                    </ButtonBase>
                </Grid>
            </Grid>
        </Paper>
    )
}