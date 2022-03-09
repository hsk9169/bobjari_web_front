import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar';

const RecommendMentor = (props) => {

    return (
        <Paper elevation={5}
            sx={{
                width: '40%',
                maxHeight: 100,
                borderRadius: 2,
                backgroundColor: '#eceff1',
                p: 1,
            }}
        >
            <Grid item container
                spacing={2.5}
                sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Grid item>
                    <Avatar alt='프로필 사진'
                        src={props.image.contentType==='url'
                            ? props.image.data
                            : `data:${props.image.contentType};base64,${props.image.data}`
                        }
                        sx={{ width: 40, height: 40}} 
                    />
                </Grid>
                <Grid item container sx={{width: '60%'}}
                    direction='column'
                >
                    <Grid item>
                        <Typography variant='body1'
                            sx={{fontWeight: 'fontWeightBold'}}
                        >
                            {props.nickname}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default RecommendMentor