import React from "react";
import { ACTION } from "../reducer/action";
import { closedtrade_reducer } from "../reducer/closed/closedtrade_reducer";
import { useOpenTrade } from "../context/OpenTradeContext";
import axios from "axios";

const ClosedTradeContext = React.createContext();
export function useClosedTrade() {
    return React.useContext(ClosedTradeContext);
}

export function ClosedTradeProvider({ children }) {
    const { dispatch } = useOpenTrade();
    const [state, dispatch_closed] = React.useReducer(closedtrade_reducer,
        {
            isClosedTrade: false,
            closedTrade: null,
        }
    );

    function showModalClosedNewTrade() {
        dispatch_closed({ type: ACTION.TOGGLEMODALCLOSEDTRADE })
    }


    async function closedTradeFn(closedTrade, input) {
        console.log(closedTrade, input);
        try {
            let status = await axios.get("http://localhost:1337/statuses/4");
            let res = await axios({
                method: "PUT",
                url: `http://localhost:1337/trades/${closedTrade.id}`,
                data: {
                    status: status.data,
                    verkaufskurs: input,
                    verkaufsdatum: new Date()
                }
            });
            dispatch({ type: ACTION.UPDATETRADE, payload: res.data });
        } catch (error) {
            alert("Fehler bei ClosedTradeFn")
        }
    }



    return (
        <ClosedTradeContext.Provider value={{ state, dispatch_closed, closedTradeFn, showModalClosedNewTrade }}>
            {children}
        </ClosedTradeContext.Provider>
    )
}