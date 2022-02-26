import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { PublicRoute, PrivateRoute } from './lib';

import { Welcome, SignInBob, SignUp, SignUpMentee, SignUpMentor, ErrorPage, NotFound, 
        SignIn, Main, Bob, Mypage, MenteeProfileEdit, Search } from 'pages';
import MainRoutes from 'routes/MainRoutes'
import KakaoCallback from 'components/KakaoCallback';
import ChatRoom from 'components/ChatRoom/Main'

import BottomNavigator from 'components/styled/BottomNavigator';

import {useSelector} from 'react-redux'
import { selectManage } from 'slices/manage';

const App = (props) => {
    const manage = useSelector(selectManage)
    
    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
            <Switch>  
                
                <Route component={KakaoCallback} path='/auths/kakao/callback' exact />
                
                <PrivateRoute component={ChatRoom} path='/room' exact botNav={false} />
                <PrivateRoute component={Bob} path='/bob' exact botNav={true} />
                <PrivateRoute component={MenteeProfileEdit} path='/mypage/edit' exact botNav={false} />
                <PrivateRoute component={Mypage} path='/mypage' exact botNav={true} />

                <PublicRoute restricted={false} component={MainRoutes} 
                    path='/main' botNav={true} />
                <PublicRoute restricted={true} component={SignUpMentor} 
                    path='/signup/mentor' exact botNav={false} />
                <PublicRoute restricted={true} component={SignUpMentee} 
                    path='/signup/mentee' exact botNav={false} />
                <PublicRoute restricted={true} component={SignUp} 
                    path='/signup' exact botNav={false} />
                <PublicRoute restricted={true} component={SignInBob} 
                    path='/signin/bob' exact botNav={false} />
                <PublicRoute restricted={true} component={Welcome} 
                    path='/' exact botNav={false} />
            </Switch>
            {manage.botNav
                ? <BottomNavigator
                    history={props.history}
                /> 
                : null
            }

                
        </ErrorBoundary>
        
    )
};

export default App;