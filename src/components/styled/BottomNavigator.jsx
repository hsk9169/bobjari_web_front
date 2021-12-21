import {Link} from 'react-router-dom'

import Paper from '@mui/material/Paper'
import HomeIconFilled from '@mui/icons-material/Home';
import BobIconFilled from '@mui/icons-material/RiceBowl';
import ProfileIconFilled  from '@mui/icons-material/Person';
import HomeIconOutlined from '@mui/icons-material/HomeOutlined';
import BobIconOutlined from '@mui/icons-material/RiceBowlOutlined';
import ProfileIconOutlined from '@mui/icons-material/PersonOutlined';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

const BottomNavigator = (props) => {
    console.log(props)

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
                            pathname: '/testHome', 
                            visible: props.visible,
                            params: props.params,                          
                        }
                    }
                    label='Home'
                    value='home'
                    icon={(props.page.value === 'home') ? <HomeIconFilled /> : <HomeIconOutlined />}
                />
                <BottomNavigationAction
                    component={Link}
                    to={
                        {
                            pathname: '/testMyPage',
                            visible: props.visible,
                            params: props.params,
                        }
                    }
                    label="Bob"
                    value='bob'
                    icon={(props.page.value === 'bob') ? <BobIconFilled /> : <BobIconOutlined />}
                />
                <BottomNavigationAction
                    component={Link}
                    to={
                        {
                            pathname: '/testHome',
                            visible: props.visible,
                            params: props.params,
                        }
                    }
                    label="Profile"
                    value='profile'
                    icon={(props.page.value === 'profile') ? <ProfileIconFilled /> : <ProfileIconOutlined />}
                />
            </BottomNavigation>
        </Paper>
    )
}

export default BottomNavigator;