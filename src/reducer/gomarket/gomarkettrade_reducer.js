import { ACTION } from "../action";
export function gomarkettrade_reducer(state, action) {
    switch (action.type) {
        case ACTION.TOGGLEMODALGOMARKETTRADE: return {...state, isGoMarketTrade: !state.isGoMarketTrade};
        case ACTION.TOGGLEMODALGOMARKETONVISTA: return {...state, isGoMarketOnVista: !state.isGoMarketOnVista};
        
        case ACTION.SETGOMARKETTRADE: return { ...state, goMarketTrade: action.payload };
        default: return state;
    }
}

