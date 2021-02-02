import React from "react";
import { ACTION } from "../reducer/action";
import axios from "axios";
import { opentrade_reducer } from "../reducer/opentrade/opentrade_reducer";
import { useLogin } from "./LoginContext";

const OpenTradeContext = React.createContext();
export function useOpenTrade() {
    return React.useContext(OpenTradeContext);
}

export function OpenTradeProvider({ children }) {
    const { state: { depot, jwt } } = useLogin();
    console.log(jwt);
    const [state, dispatch] = React.useReducer(opentrade_reducer,
        {
            initalTrades: [],
            isCreatedTrade: false,
            getUpdateTrade: null,
            loading: true,
            error: ""
        }
    );

    function deleteTrade(id) {
        axios.delete("http://localhost:1337/trades/" + id, {
            headers: {
                Authorization:
                    `Bearer ${jwt.jwt}`
            },
        })
            .then(dispatch({ type: ACTION.DELETETRADE, payload: id }))
            .catch(err => alert("Fehler beim Löschen"));
    }

    async function createTrade({ selectedOption, editorState }) {
        try {
            let status = await axios.get("http://localhost:1337/statuses/1", {
                headers: {
                    Authorization:
                        `Bearer ${jwt.jwt}`
                },
            });
            let res = await axios({
                headers: {
                    Authorization:
                        `Bearer ${jwt.jwt}`
                },
                method: "POST",
                url: "http://localhost:1337/trades/",
                data: {
                    aktie: selectedOption,
                    status: status.data,
                    description: JSON.stringify(editorState),
                    depot: depot
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
            headers: {
                Authorization:
                    `Bearer ${jwt.jwt}`
            },
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
        async function getData() {
            try {
                let { data } = await axios.get("http://localhost:1337/trades", {
                    headers: {
                        Authorization:
                            `Bearer ${jwt.jwt}`
                    }
                });
                let filterdData = data.filter(trade => trade.depot.id === depot.id);
                console.log(filterdData);
                dispatch({ type: ACTION.FETCH_SUCCESS, payload: filterdData });

            } catch (error) {
                console.log(error);
                alert("Probleme beim Laden der Trades");
            }
        }
        getData();
    }, [state.isCreatedTrade])

    return (
        <OpenTradeContext.Provider value={{ state, dispatch, deleteTrade, createTrade, updateTrade, showModalCreatedNewTrade }}>
            {children}
        </OpenTradeContext.Provider>
    )
}