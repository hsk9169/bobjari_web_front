import React, { useState } from 'react';
import { Switch } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { addApi } from './actions/index';
import { connect } from 'react-redux';

import { PublicRoute, PrivateRoute } from './lib';

import { Welcome, SignIn, SignUp, SignUpMentee, SignUpMentor, ErrorPage, NotFound, 
        Main, Search, Chat, Mypage } from 'pages';

import BottomNavigator from 'components/styled/BottomNavigator';


const mapDispatchToProps = dispatch => {
    return {
        addApi: api => dispatch(addApi(api)),
    };
};

const AppComp = (props) => {
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
    }
    
    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
                <Switch>  
                    <PrivateRoute component={Main} path='/main' exact 
                        context={privateContext} />
                    <PrivateRoute component={Search} path='/search' exact 
                        context={privateContext} />
                    <PrivateRoute component={Chat} path='/chat' exact 
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

const App = connect(null, mapDispatchToProps)(AppComp);

export default App;