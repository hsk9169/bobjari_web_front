import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { addApi } from './actions/index';
import { connect } from 'react-redux';

import { PublicRoute, PrivateRoute } from './lib';
import { Welcome, SignIn, SignUp, SignUpMentee, SignUpMentor, ErrorPage, NotFound, Main } from './pages';

import BottomNavigator from './components/styled/BottomNavigator';


const mapDispatchToProps = dispatch => {
    return {
        addApi: api => dispatch(addApi(api)),
    };
};

const AppComp = (props) => {
    const [value, setValue] = useState('home')
    const [count, countUp] = useState(0)
    const [isVisible, setIsVisible] = useState(false)

    console.log('root',count)

    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
                <Switch>
                    <PublicRoute restricted={true} exact path='/signup/mentor' component={SignUpMentor} />
                    <PublicRoute restricted={true} exact path='/signup/mentee' component={SignUpMentee} />
                    <PublicRoute restricted={true} exact path='/signup' component={SignUp} />
                    <PublicRoute restricted={true} exact path='/signin' component={SignIn} />
                    <PrivateRoute exact path='/service' component={Main} />
                    <PublicRoute restricted={true} path='/' component={Welcome} />
                    <Route component={NotFound} />
                </Switch>

                {isVisible
                    ? <BottomNavigator
                        page={{
                            value: value,
                            setValue: setValue,
                        }}
                        visible={{
                            state: isVisible,
                            setState: setIsVisible,
                        }}
                        params={{
                            count: count,
                            countUp: countUp,
                        }}
                    /> 
                    : null
                }
        </ErrorBoundary>
        
    )
};

const App = connect(null, mapDispatchToProps)(AppComp);

export default App;