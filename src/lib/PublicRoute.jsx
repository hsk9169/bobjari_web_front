import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { verifyJWT } from '../utils/handle-jwt';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    return (
        <Route
            {...rest}
                render={props =>
                    verifyJWT() && restricted 
                        // restricted to signin state
                        ? (
                            <Redirect to="/service" />
                        ) 
                        // else -> access
                        : (
                            <Component {...props} />
                        )
            }
        />
    );
}

export default PublicRoute;