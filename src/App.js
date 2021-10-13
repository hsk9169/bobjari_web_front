import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { connect } from 'react-redux';

import Main from './components/Main';
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

const AppComp = ({ session }) => {

    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
                <h1>Bobjari App</h1>
                {<Redirect to='/main' />}
                <Switch>
                    <Route path='/login' render={(props) => {
                        console.log(props);
                        if(session) {
                            return <Redirect to='/' />
                        }
                    }} component={Login} />
                    <Route path='/kakaoLogin' component={KakaoLogin} />
                    <Route path='/auths/kakao/callback' component={KakaoCallback} />
                    <Route path='/join' component={Join} />
                    <Route path='/' component={Main} />
                    <Route component={NotFound} />
                </Switch>
                
        </ErrorBoundary>
    )
};

const App = connect(mapStateToProps)(AppComp);

export default App;