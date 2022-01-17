import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import ArrowForward from '@mui/icons-material/ArrowForwardIos';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors'


const ProfileCard = (props) => {

    let imgUrl = (props.session.profileImg.contentType==='url' 
        ? props.session.profileImg.data
        : `data:${props.session.profileImg.contentType};base64,${props.session.profileImg.data}`)

    return (
            <Paper elevation={0}
                sx={{
                  pt: 2,
                  p: 1.5,
                  maxWidth: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
            >
                <Grid container>
                    <Grid item xs={3.5}>
                        <Avatar alt="프로필 사진" src={imgUrl} 
                            sx={{ width: 80, height: 80 }} />
                    </Grid>
                    <Grid item xs={7.5} container
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Grid item direction='column'>
                            <Grid item>
                                <Typography variant='h5' 
                                    sx={{ fontWeight: 'fontWeightBold' }}
                                >
                                    {props.session.userInfo.nickname}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='subtitle1' 
                                    sx={{ 
                                        fontWeight: 'fontWeightMedium', 
                                        color: grey[700] 
                                    }}
                                >
                                    {props.session.careerInfo.company}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1}>
                        <Box sx={{
                            height: '100%',
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            display: 'flex',
                            }}
                        >
                        <ButtonBase>
                            <ArrowForward 
                                color='disabled' 
                                onClick={props.editProfile} 
                            />
                        </ButtonBase>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
    );
}

export default ProfileCard;