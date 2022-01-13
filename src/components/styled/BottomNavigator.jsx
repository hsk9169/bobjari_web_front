import {Link} from 'react-router-dom'

import Paper from '@mui/material/Paper'
import HomeIconFilled from '@mui/icons-material/Home';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import ProfileIconFilled  from '@mui/icons-material/Person';
import HomeIconOutlined from '@mui/icons-material/HomeOutlined';
import RiceBowlOutlinedIcon from '@mui/icons-material/RiceBowlOutlined';
import ProfileIconOutlined from '@mui/icons-material/PersonOutlined';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';


const BottomNavigator = (props) => {
    
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation value={props.page.value} 
                onChange={(event, newValue) => {
                    props.page.setValue(newValue);
                }}
            >
                <BottomNavigationAction
                    component={Link}
                    to={
                        {
                            pathname: '/main'
                        }
                    }
                    value='main'
                    icon={(props.page.value === 'main') ? <HomeIconFilled /> : <HomeIconOutlined />}
                />
                <BottomNavigationAction
                    component={Link}
                    to={
                        {
                            pathname: '/bob', 
                        }
                    }
                    value='bob'
                    icon={(props.page.value === 'bob') ? <RiceBowlIcon /> : <RiceBowlOutlinedIcon />}
                />
                <BottomNavigationAction
                    component={Link}
                    to={
                        {
                            pathname: '/mypage', 
                        }
                    }
                    value='mypage'
                    icon={(props.page.value === 'mypage') ? <ProfileIconFilled /> : <ProfileIconOutlined />}
                />
            </BottomNavigation>
        </Paper>
    )
}

export default BottomNavigator;