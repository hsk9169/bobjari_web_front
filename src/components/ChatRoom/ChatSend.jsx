import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper'

const ChatSend = (props) => {

    return (
        <Grid container direction='row' spacing={0.5} 
            sx={{
                display: 'flex', 
                justifyContent: 'flex-end', 
                maxWidth: '90%',
        }}>
            <Grid item sx={{
                width: '25%',
                alignItems: 'flex-end', 
                display: 'flex', 
                justifyContent: 'flex-end'
            }}>
                <Typography 
                    variant='caption' 
                    color='text.secondary'
                >
                    {props.time}
                </Typography>
            </Grid>
            <Grid item sx={{maxWidth: '75%'}}>
                <Paper elevation={0} sx={{
                    p: 0.8,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f75910',
                    borderRadius: 2,
                }}>
                    <Typography variant='h7'
                        sx={{
                            color: '#FFFFFF',
                            fontWeight: 'fontWeightMedium'
                        }}
                    >
                        {props.message}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default ChatSend