import { ACTION } from "../action";
export function strategietrade_reducer(state, action) {
    switch (action.type) {
        case ACTION.TOGGLEMODALSTRATEGIETRADE: return { ...state, isStrategieTrade: !state.isStrategieTrade };
        case ACTION.SETSTRATEGIETRADE: return { ...state, strategieTrade: action.payload };
        default: return state;
    }
}

