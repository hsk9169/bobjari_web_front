import {Link} from 'react-router-dom'

import Paper from '@mui/material/Paper'
import HomeIconFilled from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import ProfileIconFilled  from '@mui/icons-material/Person';
import HomeIconOutlined from '@mui/icons-material/HomeOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
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
                            pathname: '/search',
 
                        }
                    }
                    value='search'
                    icon={<SearchIcon/>}
                />
                <BottomNavigationAction
                    component={Link}
                    to={
                        {
                            pathname: '/chat', 
                        }
                    }
                    value='chat'
                    icon={(props.page.value === 'chat') ? <ForumRoundedIcon /> : <ForumOutlinedIcon />}
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