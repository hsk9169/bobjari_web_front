import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
//import { NavigationContainer } from '@react-navigation/native';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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

import Home from './components/Home';
import Bobjari from './components/Bobjari';
import Profile from './components/Profile';
import Welcome from './components/Welcome';
import SignIn from './components/SignIn';
import SignInAuth from './components/SignInAuth';
import SignUpForm from './components/SignUpForm';
import SignUpRole from './components/SignUpRole';
import SignUpInterest from './components/SignUpInterest';
import SignUpMentorJob from './components/SignUpMentorJob';
import SignUpMentorCompany from './components/SignUpMentorCompany';
import SignUpMentorTopic from './components/SignUpMentorTopic';
import SignUpMentorSchedule from './components/SignUpMentorSchedule';
import SignUpMentorLocation from './components/SignUpMentorLocation';
import SignUpMentorAuth from './components/SignUpMentorAuth';
import SignUpMentorFee from './components/SignUpMentorFee';
import SignUpMentorIntroduce from './components/SignUpMentorIntroduce';
import SignUpMentorCongratulation from './components/SignUpMentorCongratulation';
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
    

    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
                {<Redirect to='/welcome' />}
                <Switch>
                    <Route path='/signin/auth' component={SignInAuth} />
                    <Route path='/signin' component={SignIn} />
                    <Route path='/home' component={Home} />
                    <Route path='/bobjari' component={Bobjari} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/welcome' component={Welcome} />
                    <Route path='/kakao-signup/form' component={KakaoSignUpForm} />
                    <Route path='/kakao-signup/role' component={KakaoSignUpRole} />
                    <Route path='/kakao-signup/interest' component={KakaoSignUpInterest} />
                    <Route path='/signup/form' component={SignUpForm} />
                    <Route path='/signup/role' component={SignUpRole} />
                    <Route path='/signup/interest' component={SignUpInterest} />
                    <Route path='/signup/mentor/job' component={SignUpMentorJob} />
                    <Route path='/signup/mentor/company' component={SignUpMentorCompany} />
                    <Route path='/signup/mentor/topic' component={SignUpMentorTopic} />
                    <Route path='/signup/mentor/schedule' component={SignUpMentorSchedule} />
                    <Route path='/signup/mentor/location' component={SignUpMentorLocation} />
                    <Route path='/signup/mentor/auth' component={SignUpMentorAuth} />
                    <Route path='/signup/mentor/fee' component={SignUpMentorFee} />
                    <Route path='/signup/mentor/introduce' component={SignUpMentorIntroduce} />
                    <Route path='/signup/mentor/congratulation' component={SignUpMentorCongratulation} />
                    <Route path='/auths/kakao/callback' component={KakaoCallback} />
                    <Route component={NotFound} />
                </Switch>
                
        </ErrorBoundary>
    )
};

const App = connect(null, mapDispatchToProps)(AppComp);

export default App;