import { ACTION } from "../action";
export function closedtrade_reducer(state, action) {
    switch (action.type) {
        case ACTION.TOGGLEMODALCLOSEDTRADE: return {...state, isClosedTrade: !state.isClosedTrade};
        case ACTION.SETCLOSEDTRADE: return { ...state, closedTrade: action.payload };
        default: return state;
    }
}

