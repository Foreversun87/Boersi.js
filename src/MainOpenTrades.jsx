import React from 'react';
import Loader from './components/Loader';
import { useOpenTrade } from "./context/OpenTradeContext";
import { useStrategieTrade } from "./context/StrategieTradeContext";
import { useSearchbar } from "./context/SearchbarContext";
import { ACTION } from "./reducer/action";
import { formatDate } from "./helper/formatDate";

export default function MainOpenTrades() {
    const { state: { loading }, dispatch, deleteTrade, showModalCreatedNewTrade } = useOpenTrade();
    const { showModalStrategieNewTrade, dispatch_strategie } = useStrategieTrade();
    const { openTrades } = useSearchbar();
    function onChangeOption(evt, trade) {
        if (evt.target.value === "LÖSCHEN") {
            deleteTrade(trade.id);
        }

        if (evt.target.value === "BEARBEITEN") {
            dispatch({ type: ACTION.GETUPDATETRADE, payload: trade })
            showModalCreatedNewTrade();
        }
        if (evt.target.value === "STRATEGIE") {
            dispatch_strategie({type: ACTION.SETSTRATEGIETRADE, payload: trade})  
            showModalStrategieNewTrade();
        }
    }

    return (
        <div className="main-opentrades">
            <div onClick={showModalCreatedNewTrade} className="main-opentrades-header">
                Eröffne Trades
            </div>
            {openTrades.length > 0
                ?
                <div className="main-opentrades-content">
                    {
                        openTrades.map((trade, i) =>
                            <div key={i} className="main-opentrades-content-trade">
                                <div className="main-opentrades-content-trade-text">
                                    {trade.id}: {trade.aktie.label} - {formatDate(trade.created_at)}, Update:{trade.updated_at}
                                </div>
                                <select
                                    value=""
                                    name="123"
                                    id="status"
                                    className="main-opentrades-content-trade-select"
                                    onChange={(evt) => onChangeOption(evt, trade)}
                                >
                                    <option value=""  > </option>
                                    <option value="BEARBEITEN"  >Trade bearbeiten</option>
                                    <option value="STRATEGIE" >Setze auf Strategie</option>
                                    <option value="LÖSCHEN">Löschen</option>
                                </select>
                            </div>
                        )}
                </div>
                : loading
                    ? <Loader />
                    : <div>Keine eröffneten Trades!!!</div>}
        </div>
    )
}
