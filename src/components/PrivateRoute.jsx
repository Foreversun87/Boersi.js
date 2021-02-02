import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useLogin } from "./../context/LoginContext";

export default function PrivateRoute({ children, ...rest }) {
    const { state: { isLogin } } = useLogin();
    return (
        <Route {...rest} render={({ location }) => {
            return isLogin ? children :
                <Redirect to={{
                    pathname: "/",
                    state: { from: location }
                }} />
        }} />
    )
}
