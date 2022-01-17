import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider';
import PageBox from 'components/styled/PageBox'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import {ProfileCard, ProfileInfo, ControlEtc} from 'components/MyPage/Mentee'
import {useSelector} from 'react-redux'
import {selectSessions} from 'slices/session';

const Main = (props) => {

    const session = useSelector(selectSessions)[1].session

    return (
        <Grid container direction='column'>
            <Grid item>
                <ProfileCard 
                    session={session} 
                    editProfile={props.handleEdit}
                />
            </Grid>
            <Grid item>
                <Divider />
            </Grid>
            <Grid item>
                <ProfileInfo />
            </Grid>
            <Grid item>
                <Divider />
            </Grid>
            <Grid item>
                <PageBox sx={{display: 'flex', p:3}}>
                    <Button variant='outlined'
                        onClick={props.handleRoleChange} 
                        sx={{width: '100%', height: 45, 
                            border: 2, borderRadius: 2}}
                    >
                        {props.isChanging 
                            ? <CircularProgress size={20} thickness={2} />
                            :<Typography variant='subtitle1' 
                                sx={{fontWeight: 'fontWeightBold'}}>
                                직업인으로 전환
                            </Typography>
                        }
                    </Button>
                </PageBox>
            </Grid>
            <Grid item>
                <ControlEtc />
            </Grid>
        </Grid>
    )
}

export default Main;