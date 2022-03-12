import { Switch, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { PublicRoute, PrivateRoute } from './lib';

import { Welcome, SignInBob, SignUp, SignUpMentee, SignUpMentor, ErrorPage, NotFound, 
        SignIn, MentorPropose, ChatRoom, Test } from 'pages';
import { MainRoutes, BobRoutes, MyPageRoutes } from 'routes'
import KakaoCallback from 'components/KakaoCallback';

import BottomNavigator from 'components/styled/BottomNavigator';

import {useSelector, useDispatch} from 'react-redux'
import { selectManage } from 'slices/manage';
import { setBasePath } from 'slices/basePath';

const App = (props) => {
    const dispatch = useDispatch()
    const manage = useSelector(selectManage)
    dispatch(setBasePath(
        process.env.NODE_ENV === 'development'
            ? '/local' : 'http://ec2-3-138-140-195.us-east-2.compute.amazonaws.com:8000'
    ))

    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
            <Switch>  
                
                <Route component={KakaoCallback} 
                    path='/auths/kakao/callback' exact />
                <PrivateRoute component={MentorPropose}
                    path='/propose' exact botNav={false} />
                
                <PrivateRoute component={ChatRoom} 
                    path='/chat' exact botNav={false} />
                <PrivateRoute component={MyPageRoutes} 
                    path='/mypage' exact botNav={true} />
                <PrivateRoute component={BobRoutes} 
                    path='/bob' exact botNav={true} />
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

                <Route component={Test} path='/test' exact />
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