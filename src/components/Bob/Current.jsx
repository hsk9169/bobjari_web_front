import {useState} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from 'react-router-dom'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PageBox from 'components/styled/PageBox'
import Typography from '@mui/material/Typography';
import ChatRoom from 'components/ChatRoom/Main'
import {PrivateRoute} from 'lib'

const Current = (props) => {

    return (
        <PageBox sx={{display: 'flex', width: '100%', height: 500}}>
            <Grid container direction='column' sx={{display: 'flex', alignItems: 'center'}}>
                <Grid item>
                    <Typography variant='subtitle1' sx={{fontWeight: 'fontWeightBold'}}>
                        진행 중인 밥자리가 없습니다.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='subtitle1' sx={{fontWeight: 'fontWeightBold'}}>
                        지금 바로 직업인을 검색해보세요.
                    </Typography>
                </Grid>
                <br/>
                <Grid item>
                    <Button variant='contained'>
                        <Typography variant='subtitle1'>
                            검색하기
                        </Typography>
                    </Button>
                </Grid>


                <Grid item>
                    <Link to='/room/1'>
                        room1
                    </Link>
                </Grid>
                <Grid item>
                    <Link to='/room/2'>
                        room2
                    </Link>
                </Grid>
            </Grid>
        </PageBox>
    )
}

export default Current;