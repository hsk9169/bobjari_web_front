import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { connect } from 'react-redux';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import BobIcon from '@mui/icons-material/RiceBowl';
import ProfileIcon from '@mui/icons-material/Person';

import Main from './components/Main';
import Welcome from './components/Welcome';
import Login from './components/Login';
import KakaoLogin from './components/KakaoLogin';
import KakaoCallback from './components/KakaoCallback';
import Join from './components/Join';
import NotFound from './components/NotFound';
import ErrorPage from './components/ErrorPage';

const mapStateToProps = state => {
    return {
        session: state.session
    };
};

const AppComp = ({ session }, props) => {

    const [ value, setValue ] = React.useState('0');

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
                    <Route path='/login' render={(props) => {
                        if(session) {
                            return <Redirect to='/main' />
                        }
                    }} component={Login} />
                    <Route path='/welcome' component={Welcome} />
                    <Route path='/kakaoLogin' component={KakaoLogin} />
                    <Route path='/auths/kakao/callback' component={KakaoCallback} />
                    <Route path='/join' component={Join} />
                    <Route path='/main' component={Main} />
                    <Route component={NotFound} />
                </Switch>
                <BottomNavigation value={value} onChange={handleChange}>
                    <BottomNavigationAction
                        label="Home"
                        value="home"
                        icon={<HomeIcon />}
                    />
                    <BottomNavigationAction
                        label="Bob"
                        value="bob"
                        icon={<BobIcon />}
                    />
                    <BottomNavigationAction
                        label="Profile"
                        value="profile"
                        icon={<ProfileIcon />}
                    />
                </BottomNavigation>                
        </ErrorBoundary>
    )
};

const App = connect(mapStateToProps)(AppComp);

export default App;