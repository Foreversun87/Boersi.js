import React from "react";
import { ACTION } from "../reducer/action";
import { login_reducer } from "../reducer/login/login_reducer";
import axios from "axios";

const LoginContext = React.createContext();
export function useLogin() {
    return React.useContext(LoginContext);
}

export function LoginProvider({ children }) {
    const [state, dispatch_login] = React.useReducer(login_reducer,
        {
            isLogin: true,
            depot: null,

        }
    );

    React.useEffect(() => {
        if (state.isLogin) {
            //Depotid ist noch Hardgecoded!!
            axios.get("http://localhost:1337/depots/1")
                .then(depot => dispatch_login({ type: ACTION.SETDEPOT, payload: depot.data }))
                .catch(err => alert("Fehler beim Depotladen"))

        } else {
            dispatch_login({ type: ACTION.SETDEPOT, payload: null })
        }
    }, [state.isLogin])

    return (
        <LoginContext.Provider value={{ state, dispatch_login }}>
            {children}
        </LoginContext.Provider>
    )
}