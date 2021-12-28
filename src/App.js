import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { addApi } from './actions/index';
import { connect } from 'react-redux';

import { PublicRoute, PrivateRoute } from './lib';

import { Welcome, SignIn, SignUp, SignUpMentee, SignUpMentor, ErrorPage, NotFound, 
        Main, Search, Chat, Mypage } from './pages';

import BottomNavigator from './components/styled/BottomNavigator';


const mapDispatchToProps = dispatch => {
    return {
        addApi: api => dispatch(addApi(api)),
    };
};

const AppComp = (props) => {
    const [value, setValue] = useState('main')
    const [isVisible, setIsVisible] = useState(false)
    const [access, setAccess] = useState(true)
    
    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
                <Switch>
                    
                    <PrivateRoute component={Main} path='/main' exact 
                        setBotNav={setIsVisible} access={access} setAccess={setAccess} />
                    <PrivateRoute component={Search} path='/search' exact 
                        setBotNav={setIsVisible} access={access} setAccess={setAccess} />
                    <PrivateRoute component={Chat} path='/chat' exact 
                        setBotNav={setIsVisible} access={access} setAccess={setAccess} />
                    <PrivateRoute component={Mypage} path='/mypage' exact 
                        setBotNav={setIsVisible} access={access} setAccess={setAccess} />

                    <PublicRoute restricted={true} component={SignUpMentor} 
                        path='/signup/mentor' exact setBotNav={setIsVisible}/>
                    <PublicRoute restricted={true} component={SignUpMentee} 
                        path='/signup/mentee' exact setBotNav={setIsVisible} />
                    <PublicRoute restricted={true} component={SignUp} 
                        path='/signup' exact setBotNav={setIsVisible} />
                    <PublicRoute restricted={true} component={SignIn} 
                        path='/signin' exact setBotNav={setIsVisible} />
                    <PublicRoute restricted={true} component={Welcome} 
                        path='/' exact setBotNav={setIsVisible} />
                </Switch>
                {isVisible
                    ? <BottomNavigator
                        page={{
                            value: value,
                            setValue: setValue,
                        }}
                        access={{
                            access: access,
                            setAccess: setAccess,
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