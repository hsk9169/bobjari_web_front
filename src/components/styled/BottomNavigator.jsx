import {useState} from 'react';
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

import axios from 'axios';


const BottomNavigator = (props) => {
    console.log(props)
    
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation value={props.page.value} 
                onChange={async(event, newValue) => {
                    await axios.get(process.env.REACT_APP_API_VERIFY_TOKEN,
                        { headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        }})
                        .then(res => {
                            if (res.data === 'valid') {
                                console.log('token valid')
                                props.page.setValue(newValue);
                                props.access.setAccess(true);                       
                            } else if (res.data === 'invalid') {
                                console.log('token invalid');
                                props.page.setValue(newValue);
                                props.access.setAccess(false);                       
                            }         
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    
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