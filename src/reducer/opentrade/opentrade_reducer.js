import { ACTION } from "../action";
export function opentrade_reducer(state, action) {
    // console.log("Reducer-Function:", action.type, " Payload:", action.payload);
    switch (action.type) {
        case ACTION.TOGGLESIDEBAR:
            return { ...state, isSidebarShow: !state.isSidebarShow };
        case ACTION.GETUPDATETRADE: return { ...state, getUpdateTrade: action.payload };
        case ACTION.SETUPDATETRADENULL: return { ...state, getUpdateTrade: null };
        case ACTION.UPDATETRADE: return { ...state, initalTrades: state.initalTrades.map(trade => trade.id === action.payload.id ? action.payload : trade) };
        case ACTION.DELETETRADE: return { ...state, initalTrades: state.initalTrades.filter(trade => trade.id !== action.payload) }
        case ACTION.CREATETRADE:
            return {
                ...state,
                initalTrades: [...state.initalTrades, action.payload],
                isCreatedTrade: !state.isCreatedTrade
            };
        case ACTION.TOGGLEMODALCREATEDTRADE:
            return { ...state, isCreatedTrade: !state.isCreatedTrade };
        case ACTION.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                initalTrades: action.payload,
                error: ""
            };
        case ACTION.FETCH_ERROR:
            return {
                ...state,
                loading: true,
                initalTrades: [],
                error: "Fehler beim Laden"
            };
        default: return state;
    };
};