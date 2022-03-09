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
import {selectManage, updateNavScreen, updateBobTab} from 'slices/manage'


const BottomNavigator = (props) => {
    const dispatch = useDispatch()
    const manage = useSelector(selectManage)
    
    return (
        <Paper 
            sx={{ 
                position: 'fixed', 
                bottom: 0, 
                left: 0, 
                right: 0,
            }} 
            elevation={10}
        >
            <BottomNavigation 
                value={manage.navScreen} 
                onChange={(event, newValue) => {
                    dispatch(updateNavScreen(newValue))
                    dispatch(updateBobTab(0))
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
                    icon={(manage.navScreen === 'main') 
                    ? <HomeIconFilled 
                        sx={{color: '#000000'}}/> 
                    : <HomeIconOutlined 
                        sx={{color: '#000000'}}/>}
                />
                <BottomNavigationAction
                    component={Link}
                    to={
                        {
                            pathname: '/bob', 
                        }
                    }
                    value='bob'
                    icon={(manage.navScreen === 'bob') 
                    ? <RiceBowlIcon 
                        sx={{color: '#000000'}}/>  
                    : <RiceBowlOutlinedIcon 
                        sx={{color: '#000000'}}/>}
                />
                <BottomNavigationAction
                    component={Link}
                    to={
                        {
                            pathname: '/mypage', 
                        }
                    }
                    value='mypage'
                    icon={(manage.navScreen === 'mypage') 
                    ? <ProfileIconFilled
                        sx={{color: '#000000'}}/> 
                    : <ProfileIconOutlined 
                        sx={{color: '#000000'}}/>}
                />
            </BottomNavigation>
        </Paper>
    )
}

export default BottomNavigator;