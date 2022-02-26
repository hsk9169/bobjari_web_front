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

import {useSelector, useDispatch} from 'react-redux'
import {selectManage, updateNavScreen} from 'slices/manage'


const BottomNavigator = (props) => {
    const dispatch = useDispatch()
    const manage = useSelector(selectManage)
    
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation value={manage.navScreen} 
                onChange={(event, newValue) => {
                    dispatch(updateNavScreen(newValue))
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
                    icon={(manage.navScreen === 'main') ? <HomeIconFilled /> : <HomeIconOutlined />}
                />
                <BottomNavigationAction
                    component={Link}
                    to={
                        {
                            pathname: '/bob', 
                        }
                    }
                    value='bob'
                    icon={(manage.navScreen === 'bob') ? <RiceBowlIcon /> : <RiceBowlOutlinedIcon />}
                />
                <BottomNavigationAction
                    component={Link}
                    to={
                        {
                            pathname: '/mypage', 
                        }
                    }
                    value='mypage'
                    icon={(manage.navScreen === 'mypage') ? <ProfileIconFilled /> : <ProfileIconOutlined />}
                />
            </BottomNavigation>
        </Paper>
    )
}

export default BottomNavigator;