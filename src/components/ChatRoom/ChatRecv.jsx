import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar';

const ChatRecv = (props) => {

    return (
        <Grid container direction='row' spacing={0.5} 
            sx={{
                display: 'flex', 
                justifyContent: 'flex-start', 
                maxWidth: '100%',
        }}>
            <Grid item sx={{
                width: '10%', 
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
            }}>
                <Avatar alt='프로필 사진'
                    src={props.image.contentType==='url'
                        ? props.image.data
                        : `data:${props.image.contentType};base64,${props.image.data}`
                    }
                    sx={{ width: 30, height: 30}} 
                />
            </Grid>
                
            <Grid item sx={{maxWidth: '65%'}}>
                <Paper elevation={0} sx={{
                    p: 0.8,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#90a4ae',
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
            <Grid item sx={{
                width: '25%',
                alignItems: 'flex-end', 
                display: 'flex', 
                justifyContent: 'flex-start'
            }}>
                <Typography 
                    variant='caption' 
                    color='text.secondary'
                >
                    {props.time}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default ChatRecv