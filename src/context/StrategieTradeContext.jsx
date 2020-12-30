import React from "react";
import { ACTION } from "../reducer/action";
import { strategietrade_reducer } from "../reducer/strategietrade/strategietrade_reducer";
import { useOpenTrade } from "../context/OpenTradeContext";
import axios from "axios";

const StrategieTradeContext = React.createContext();
export function useStrategieTrade() {
    return React.useContext(StrategieTradeContext);
}

export function StrategieTradeProvider({ children }) {
    const { dispatch } = useOpenTrade();
    const [state, dispatch_strategie] = React.useReducer(strategietrade_reducer,
        {
            isStrategieTrade: false,
            strategieTrade: null,
        }
    );

    function showModalStrategieNewTrade() {
        dispatch_strategie({ type: ACTION.TOGGLEMODALSTRATEGIETRADE })
    }

    async function updateTrade(editorState, strategieTrade, input) {
        try {
            let status = await axios.get("http://localhost:1337/statuses/2");
            console.log(status);
            let res = await axios({
                method: "PUT",
                url: `http://localhost:1337/trade/${strategieTrade.id}`,
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
            alert("Fehler beim StrategieUpdate: Statusabfrage")
        } finally {
            alert("finally in StrategieTradeContext")
            showModalStrategieNewTrade();
            dispatch_strategie({
                type: ACTION.SETSTRATEGIETRADE, payload: null
            });
        }



    }

    return (
        <StrategieTradeContext.Provider value={{ state, dispatch_strategie, updateTrade, showModalStrategieNewTrade }}>
            {children}
        </StrategieTradeContext.Provider>
    )
}