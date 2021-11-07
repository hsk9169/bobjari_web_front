import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { addApi } from './actions/index';
import { connect } from 'react-redux';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIconFilled from '@mui/icons-material/Home';
import HomeIconOutlined from '@mui/icons-material/HomeOutlined';
import BobIconFilled from '@mui/icons-material/RiceBowl';
import BobIconOutlined from '@mui/icons-material/RiceBowlOutlined';
import ProfileIconFilled from '@mui/icons-material/Person';
import ProfileIconOutlined from '@mui/icons-material/PersonOutline';

import Main from './components/Main';
import Welcome from './components/Welcome';
import SignIn from './components/SignIn';
import SignInAuth from './components/SignInAuth';
import SignUpForm from './components/SignUpForm';
import SignUpRole from './components/SignUpRole';
import SignUpInterest from './components/SignUpInterest';
import KakaoCallback from './components/KakaoCallback';
import KakaoSignUpForm from './components/KakaoSignUpForm';
import KakaoSignUpRole from './components/KakaoSignUpRole';
import KakaoSignUpInterest from './components/KakaoSignUpInterest';
import NotFound from './components/NotFound';
import ErrorPage from './components/ErrorPage';

const mapDispatchToProps = dispatch => {
    return {
        addApi: api => dispatch(addApi(api)),
    };
};

const AppComp = (props) => {

    const [ value, setValue ] = React.useState('home');
    

    const handleChange = (event, newValue) => {
        setValue(newValue);
        switch(value) {
            case 'home':
                break;
            case 'bob':
                break;
            case 'profile':
                break;
            default:
                break;
        }
    };

    useEffect( () => {
        const api = {
            KAKAO_TOKEN: process.env.REACT_APP_API_KAKAO_TOKEN,
            CHECK_NICKNAME: process.env.REACT_APP_API_CHECK_NICKNAME,
            SIGN_IN_KAKAO: process.env.REACT_APP_API_SIGN_IN_KAKAO,
            USER_JOIN: process.env.REACT_APP_API_USER_JOIN,
            SIGN_IN: process.env.REACT_APP_API_SIGN_IN,
            EMAIL_AUTH: process.env.REACT_APP_API_EMAIL_AUTH,
        }
        props.addApi(api);
    });

    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
                {<Redirect to='/welcome' />}
                <Switch>
                    <Route path='/signin/auth' component={SignInAuth} />
                    <Route path='/signin' component={SignIn} />
                    <Route path='/main' component={Main} />
                    <Route path='/welcome' component={Welcome} />
                    <Route path='/kakao-signup/form' component={KakaoSignUpForm} />
                    <Route path='/kakao-signup/role' component={KakaoSignUpRole} />
                    <Route path='/kakao-signup/interest' component={KakaoSignUpInterest} />
                    <Route path='/signup/form' component={SignUpForm} />
                    <Route path='/signup/role' component={SignUpRole} />
                    <Route path='/signup/interest' component={SignUpInterest} />
                    <Route path='/auths/kakao/callback' component={KakaoCallback} />
                    <Route component={NotFound} />
                </Switch>
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation value={value} onChange={handleChange}>
                        <BottomNavigationAction
                            label="Home"
                            value="home"
                            icon={(value === 'home') ? <HomeIconFilled /> : <HomeIconOutlined />}
                        />
                        <BottomNavigationAction
                            label="Bob"
                            value="bob"
                            icon={(value === 'bob') ? <BobIconFilled /> : <BobIconOutlined />}
                        />
                        <BottomNavigationAction
                            label="Profile"
                            value="profile"
                            icon={(value === 'profile') ? <ProfileIconFilled /> : <ProfileIconOutlined />}
                        />
                    </BottomNavigation> 
                </Paper>
        </ErrorBoundary>
    )
};

const App = connect(null, mapDispatchToProps)(AppComp);

export default App;