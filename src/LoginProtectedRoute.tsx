import React from 'react';
import { Route, Redirect } from 'react-router-dom'


type Props = {
    isAuth: boolean;
    component: React.FC
    path: string;
    exact: true
}

const LoginProtectedRoute: React.FC<Props> = ({ isAuth, component: Component, path, exact, ...rest }) => {
    return (
        <Route
            path={path}
            exact={exact}
            {...rest}
            render={props => {
                if (isAuth) {
                    return <Redirect to='/' />
                } else {
                    return <Component {...rest} {...props} />
                }
            }}
        ></Route>
        
    )
}

export default LoginProtectedRoute
