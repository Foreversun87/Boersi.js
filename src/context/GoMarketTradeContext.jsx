import React from "react";
import { ACTION } from "../reducer/action";
import { gomarkettrade_reducer } from "../reducer/gomarket/gomarkettrade_reducer";
import { useOpenTrade } from "../context/OpenTradeContext";
import { useLogin } from "./LoginContext";
import axios from "axios";


const GoMarketTradeContext = React.createContext();
export function useGoMarketTrade() {
    return React.useContext(GoMarketTradeContext);
}

export function GoMarketTradeProvider({ children }) {
    const { state: { jwt } } = useLogin();
    const { dispatch } = useOpenTrade();
    const [state, dispatch_gomarket] = React.useReducer(gomarkettrade_reducer,
        {
            isGoMarketTrade: false,
            isGoMarketOnVista: false,
            goMarketTrade: null,
        }
    );

    function showModalGoMarketNewTrade() {
        dispatch_gomarket({ type: ACTION.TOGGLEMODALGOMARKETTRADE })
    }

    function showModalGoMarketOnVista() {
        dispatch_gomarket({ type: ACTION.TOGGLEMODALGOMARKETONVISTA })
    }

    async function updateTrade(editorState, strategieTrade, input) {
        try {
            let status = await axios.get("http://localhost:1337/statuses/3", {
                headers: {
                    Authorization:
                        `Bearer ${jwt.jwt}`
                }
            });
            console.log(status);
            let res = await axios({
                headers: {
                    Authorization:
                        `Bearer ${jwt.jwt}`
                },
                method: "PUT",
                url: `http://localhost:1337/trades/${strategieTrade.id}`,
                data: {
                    description: JSON.stringify(editorState),
                    status: status.data,
                    einkaufskurs: input.einkaufskurs,
                    stoppkurs: input.stoppkurs,
                    zielkurs: input.zielkurs,
                }
            });
            dispatch({ type: ACTION.UPDATETRADE, payload: res.data });
        } catch (error) {
            alert("Fehler beim GoMarketUpdate: Statusabfrage")
        }
    }

    async function goMarketOnVista(gomarketTrade, trailingDate) {
        try {
            let status = await axios.get("http://localhost:1337/statuses/3", {
                headers: {
                    Authorization:
                        `Bearer ${jwt.jwt}`
                }
            });
            let res = await axios({
                headers: {
                    Authorization:
                        `Bearer ${jwt.jwt}`
                },
                method: "PUT",
                url: `http://localhost:1337/trades/${gomarketTrade.id}`,
                data: {
                    status: status.data,
                    einkaufsdatum: new Date(),
                    trailing_stop_datum: new Date(trailingDate)
                }
            });
            dispatch({ type: ACTION.UPDATETRADE, payload: res.data });
        } catch (error) {
            alert("Fehler beim GoMarketFn")
        }
    }

    return (
        <GoMarketTradeContext.Provider value={{ state, dispatch_gomarket, updateTrade, goMarketOnVista, showModalGoMarketOnVista, showModalGoMarketNewTrade }}>
            {children}
        </GoMarketTradeContext.Provider>
    )
}