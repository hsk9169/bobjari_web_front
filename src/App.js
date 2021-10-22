import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
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
import SignUpForm from './components/SignUpForm';
import KakaoCallback from './components/KakaoCallback';
import SignUp from './components/SignUp';
import NotFound from './components/NotFound';
import ErrorPage from './components/ErrorPage';

const mapStateToProps = state => {
    return {
        session: state.session
    };
};

const AppComp = ({ session }, props) => {

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

    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
                {<Redirect to='/welcome' />}
                <Switch>
                    <Route path='/signin' render={(props) => {
                        if(session) {
                            return <Redirect to='/main' />
                        }
                    }} component={SignIn} />
                    <Route path='/welcome' component={Welcome} />
                    <Route path='/signupform' component={SignUpForm} />
                    <Route path='/auths/kakao/callback' component={KakaoCallback} />
                    <Route path='/signup' component={SignUp} />
                    <Route path='/main' component={Main} />
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

const App = connect(mapStateToProps)(AppComp);

export default App;