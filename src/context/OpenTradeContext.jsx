import React from "react";
import { ACTION } from "../reducer/action";
import axios from "axios";
import { opentrade_reducer } from "../reducer/opentrade/opentrade_reducer";

const OpenTradeContext = React.createContext();
export function useOpenTrade() {
    return React.useContext(OpenTradeContext);
}

export function OpenTradeProvider({ children }) {
    const [state, dispatch] = React.useReducer(opentrade_reducer,
        {
            initalTrades: [],
            isSidebarShow: false,
            isCreatedTrade: false,
            getUpdateTrade: null,
            loading: true,
            error: ""
        }
    );

    function deleteTrade(id) {
        axios.delete("http://localhost:1337/trades/" + id)
            .then(dispatch({ type: ACTION.DELETETRADE, payload: id }))
            .catch(err => alert("Fehler beim Löschen"));
    }

    async function createTrade({ selectedOption, editorState }) {
        try {
            let status = await axios.get("http://localhost:1337/statuses/1");
            let res = await axios({
                method: "POST",
                url: "http://localhost:1337/trades/",
                data: {
                    aktie: selectedOption,
                    status: status.data,
                    description: JSON.stringify(editorState)
                }
            });
            console.log("Ausgabe der Response: ", res);
            let newTrade = {
                id: res.data.id,
                aktie: {
                    typ: res.data.aktie.typ,
                    value: res.data.aktie.value,
                    wkn: res.data.aktie.wkn,
                },
                status: res.data.status,
                description: res.data.description
            }
            console.log(newTrade);
            dispatch({ type: ACTION.CREATETRADE, payload: newTrade })
        } catch (err) {
            alert("Fehler beim erstellen");
        }
    }

    function updateTrade(editorState, getUpdateTrade) {
        axios({
            method: "PUT",
            url: `http://localhost:1337/trades/${getUpdateTrade.id}`,
            data: {
                description: JSON.stringify(editorState)
            },
        })
            .then(res => dispatch({ type: ACTION.UPDATETRADE, payload: res.data }))
            .catch(err => alert("Fehler beim Updaten"))
            .finally(() => {
                showModalCreatedNewTrade();
                dispatch({
                    type: ACTION.SETUPDATETRADENULL
                })
            });
    }

    function showModalCreatedNewTrade() {
        dispatch({ type: ACTION.TOGGLEMODALCREATEDTRADE })
    }

    React.useEffect(() => {
        function getData() {
            axios.get("http://localhost:1337/trades")
                .then(res => dispatch({ type: ACTION.FETCH_SUCCESS, payload: res.data }))
                .catch(err => alert("Probleme beim Laden der Trades"));
        }
        getData();
    }, [state.isCreatedTrade])

    return (
        <OpenTradeContext.Provider value={{ state, dispatch, deleteTrade, createTrade, updateTrade, showModalCreatedNewTrade }}>
            {children}
        </OpenTradeContext.Provider>
    )
}