import { ACTION } from "../action";

export function login_reducer(state, action) {
    switch (action.type) {
        case ACTION.SETDEPOT: return { ...state, depot: action.payload };
        case ACTION.TOGGLELOGIN: return { ...state, isLogin: !state.isLogin };
        case ACTION.SETJWT: return { ...state, jwt: action.payload };
        case ACTION.SETERROR: return { ...state, error: action.payload };
        case ACTION.SETUSER: return { ...state, user: action.payload };
        
        default: return state;
    }
}