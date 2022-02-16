import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { PublicRoute, PrivateRoute } from './lib';

import { Welcome, SignInBob, SignUp, SignUpMentee, SignUpMentor, ErrorPage, NotFound, 
        SignIn, Main, Bob, Mypage, MenteeProfileEdit } from 'pages';
import KakaoCallback from 'components/KakaoCallback';
import ChatRoom from 'components/ChatRoom/Main'

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
                
                <Route component={KakaoCallback} path='/auths/kakao/callback' exact />
                <Route component={ChatRoom} path='/room/:id' />
                
                <PrivateRoute component={Bob} path='/bob' exact 
                    context={privateContext} />
                <PrivateRoute component={MenteeProfileEdit} path='/mypage/edit' exact
                    context={privateContext} />
                <PrivateRoute component={Mypage} path='/mypage' exact 
                    context={privateContext} />

                <PublicRoute restricted={false} component={Main} 
                    path='/main' exact 
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
                <PublicRoute restricted={true} component={SignInBob} 
                    path='/signin/bob' exact
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