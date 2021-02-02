import React from 'react';
import { useSearchbar } from "./../../../context/SearchbarContext";
import { useOpenTrade } from "./../../../context/OpenTradeContext";
import Loader from './../../../components/Loader';
import { useStrategieTrade } from './../../../context/StrategieTradeContext';
import { useGoMarketTrade } from "./../../../context/GoMarketTradeContext";
import { ACTION } from "./../../../reducer/action";

export default function MainStrategieTrades() {
    const { state: { loading }, dispatch, deleteTrade } = useOpenTrade();
    const { strategieTrades } = useSearchbar();
    const { dispatch_strategie, showModalStrategieNewTrade } = useStrategieTrade();
    const { showModalGoMarketOnVista, dispatch_gomarket } = useGoMarketTrade();

    function onChangeOption(evt, trade) {
        if (evt.target.value === "LÖSCHEN") {
            deleteTrade(trade.id);
        }

        if (evt.target.value === "BEARBEITEN") {
            dispatch_strategie({ type: ACTION.SETSTRATEGIETRADE, payload: trade })
            showModalStrategieNewTrade();
        }
        if (evt.target.value === "HANDELN") {
            dispatch_gomarket({ type: ACTION.SETGOMARKETTRADE, payload: trade })
            showModalGoMarketOnVista();
        }
    }

    return (
        <div className="main-strategie">
            <div className="main-opentrades-header">
                Strategie der Trades
            </div>
            {strategieTrades.length > 0
                ?
                <div className="main-opentrades-content">
                    {strategieTrades.map((trade, i) =>
                        <div key={i} className="main-opentrades-content-trade">
                            <div className="main-opentrades-content-trade-text">
                                {trade.id}: {trade.aktie.label} EK: {trade.einkaufskurs}€
                            </div>
                            <select
                                value=""
                                name="123"
                                id="status"
                                className="main-opentrades-content-trade-select"
                                onChange={(evt) => onChangeOption(evt, trade)}
                            >
                                <option value=""  > </option>
                                <option value="BEARBEITEN">Trade bearbeiten </option>
                                <option value="HANDELN" >Setze auf Handel</option>
                                <option value="LÖSCHEN">Löschen</option>
                            </select>
                        </div>
                    )}
                </div>
                : loading
                    ? <Loader />
                    : <div>Keine Trades im Strategiestatus!!!</div>}
        </div>
    )
}
