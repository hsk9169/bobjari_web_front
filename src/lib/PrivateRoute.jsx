import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { verifyJWT } from '../utils/handle-jwt';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
                render={props =>
                    verifyJWT 
                        ? (
                            <Component {...props} />
                        ) 
                        : (
                            <Redirect to="/" />
                        ) 
            }
        />
    );
}

export default PrivateRoute;