import React from "react";
import { ACTION } from "../reducer/action";
import { closedtrade_reducer } from "../reducer/closed/closedtrade_reducer";
import { useOpenTrade } from "../context/OpenTradeContext";
import { useLogin } from "./LoginContext";
import { calculations } from "../helper/strategieMath";
import axios from "axios";

const ClosedTradeContext = React.createContext();
export function useClosedTrade() {
    return React.useContext(ClosedTradeContext);
}

export function ClosedTradeProvider({ children }) {
    const { state: { jwt }, dispatch_login } = useLogin();
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

    // input = Verkaufskurs;
    // closedTrade = Derjenige Trade der abgeschlossen werden soll
    async function closedTradeFn(closedTrade, input) {
        console.log(closedTrade, input);
        try {
            let status = await axios.get("http://localhost:1337/statuses/4", {
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

    // input = Verkaufskurs;
    // closedTrade = Derjenige Trade der abgeschlossen werden soll

    async function changeDepotIncome(depot, closedTrade, input) {
        let calc = calculations({
            depot: depot,
            input: {
                einkaufskurs: closedTrade.einkaufskurs,
                stoppkurs: closedTrade.stoppkurs,
                zielkurs: closedTrade.zielkurs,
                verkaufskurs: input
            }
        });

        console.log("Dieser Betrag muss abgezogen werden: ", calc.realGewinn, " von Depot: ", depot.einlagen);
        let neuerKontostand = depot.einlagen + calc.realGewinn;
        console.log("Neuer Kontostand: ", neuerKontostand);

        try {
            let res = await axios({
                url: `http://localhost:1337/depots/${closedTrade.depot.id}`,
                headers: {
                    Authorization:
                        `Bearer ${jwt.jwt}`
                },
                method: "PUT",
                data: {
                    einlagen: neuerKontostand
                }

            });
            console.log("Antwort from server: ", res.data);
            dispatch_login({ type: ACTION.SETDEPOT, payload: res.data });
        } catch (error) {
            console.log(error);
            alert("Fehler beim aktualisieren des Kontostandes");
        }
    }

    return (
        <ClosedTradeContext.Provider value={{ state, dispatch_closed, closedTradeFn, changeDepotIncome, showModalClosedNewTrade }}>
            {children}
        </ClosedTradeContext.Provider>
    )
}