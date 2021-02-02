import React from "react";
import { ACTION } from "../reducer/action";
import { login_reducer } from "../reducer/login/login_reducer";
import axios from "axios";
import { withRouter, useHistory } from "react-router-dom";

const LoginContext = React.createContext();
export function useLogin() {
    return React.useContext(LoginContext);
}

function LoginProvider({ children }) {
    const history = useHistory();
    const [state, dispatch_login] = React.useReducer(login_reducer,
        {
            isLogin: false,
            depot: null,
            jwt: null,
            error: false,
            user: null,
        }
    );

    async function login({ identifier, password }) {
        try {
            const { data } = await axios.post('http://localhost:1337/auth/local', {
                identifier: identifier,
                password: password,
            });
            console.log(data.user);
            dispatch_login({ type: ACTION.TOGGLELOGIN });
            dispatch_login({ type: ACTION.SETDEPOT, payload: data.user.depot });
            dispatch_login({ type: ACTION.SETJWT, payload: data });
            dispatch_login({ type: ACTION.SETUSER, payload: data.user });

            history.push("/main");

        } catch (err) {
            console.dir(err.request.status);
            dispatch_login({ type: ACTION.SETERROR, payload: err.request.status })
        }
    }

    async function logout() {
        dispatch_login({ type: ACTION.SETJWT, payload: null });
        dispatch_login({ type: ACTION.SETDEPOT, payload: null });
        dispatch_login({ type: ACTION.SETERROR, payload: null })
        dispatch_login({ type: ACTION.SETUSER, payload: null })
        dispatch_login({ type: ACTION.TOGGLELOGIN })

        history.push("/");
    }

    return (
        <LoginContext.Provider value={{ state, dispatch_login, login, logout }}>
            {children}
        </LoginContext.Provider>
    )
}

export default withRouter(LoginProvider)