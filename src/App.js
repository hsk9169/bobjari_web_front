import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { PublicRoute, PrivateRoute } from './lib';

import { Welcome, SignIn, SignUp, SignUpMentee, SignUpMentor, ErrorPage, NotFound, 
        Main, Bob, Mypage, TestHome } from 'pages';
import {ProfileEdit} from 'components/MyPage/Mentee'
import KakaoCallback from 'components/KakaoCallback';

import BottomNavigator from 'components/styled/BottomNavigator';

const App = (props) => {
    const [value, setValue] = useState('main')
    const [isVisible, setIsVisible] = useState(false)
    const [sessionTime, setSessionTime] = useState({
        expireTime: null,
        reaminTime: null,
    })

    let privateContext = {
        setBotNav: setIsVisible,
        setScreen: setValue,
        sessionTime: sessionTime,
        setSessionTime: setSessionTime,
    }

    let publicContext = {
        setBotNav: setIsVisible,
        setScreen: setValue,
    }
    
    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
            <Switch>  

                <Route component={TestHome} path='/test' exact />
                
                <Route component={KakaoCallback} path='/auths/kakao/callback' exact />

                <PrivateRoute component={Main} path='/main' exact 
                    context={privateContext} />
                <PrivateRoute component={Bob} path='/bob' exact 
                    context={privateContext} />
                <PrivateRoute component={ProfileEdit} path='/mypage/edit' exact
                    context={privateContext} />
                <PrivateRoute component={Mypage} path='/mypage' exact 
                    context={privateContext} />

                <PublicRoute restricted={true} component={SignUpMentor} 
                    path='/signup/mentor' exact
                    context={publicContext} />
                <PublicRoute restricted={true} component={SignUpMentee} 
                    path='/signup/mentee' exact
                    context={publicContext} />
                <PublicRoute restricted={true} component={SignUp} 
                    path='/signup' exact
                    context={publicContext} />
                <PublicRoute restricted={true} component={SignIn} 
                    path='/signin' exact
                    context={publicContext} />
                <PublicRoute restricted={true} component={Welcome} 
                    path='/' exact
                    context={publicContext} />
            </Switch>
            {isVisible
                ? <BottomNavigator
                    page={{
                        value: value,
                        setValue: setValue,
                    }}
                    history={props.history}
                /> 
                : null
            }

                
        </ErrorBoundary>
        
    )
};

export default App;