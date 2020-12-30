import { ACTION } from "../action";

export function login_reducer(state, action) {
    switch (action.type) {
        case ACTION.SETDEPOT: return { ...state, depot: action.payload };
        case ACTION.SETLOGIN: {
            if (action.payload === "LOGOUT") {
                return { ...state, isLogin: false }
            } else {
                if (action.payload === "LOGIN") {
                    return { ...state, isLogin: true }
                }else{
                    alert("Falscheingabe bei Login_Reducer")
                }
            }
        };
        case ACTION.TOGGLELOGIN: return { ...state, isLogin: !state.isLogin };
        default: return state;
    }
}