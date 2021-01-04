import React from 'react';
import { useSearchbar } from "./context/SearchbarContext";
import { useOpenTrade } from "./context/OpenTradeContext";
import { useClosedTrade } from './context/ClosedTradeContext';
import { useGoMarketTrade } from "./context/GoMarketTradeContext";
import { formatDate} from "./helper/formatDate";
import Loader from './components/Loader';
import { ACTION } from "./reducer/action";


export default function MainGoMarketTrades() {
    const { state: { loading }, deleteTrade } = useOpenTrade();
    const { goMarketTrades } = useSearchbar();
    const { dispatch_gomarket, showModalGoMarketNewTrade } = useGoMarketTrade();
    const { dispatch_closed, showModalClosedNewTrade } = useClosedTrade()

    function onChangeOption(evt, trade) {
        if (evt.target.value === "CLOSED") {
            dispatch_closed({ type: ACTION.SETCLOSEDTRADE, payload: trade });
            showModalClosedNewTrade();
        }

        if (evt.target.value === "BEARBEITEN") {
            dispatch_gomarket({ type: ACTION.SETGOMARKETTRADE, payload: trade })
            showModalGoMarketNewTrade();
        }

        if (evt.target.value === "LÖSCHEN") {
            deleteTrade(trade.id);
        }

    }

    return (
        <div className="main-content">
            <div className="main-opentrades-header">
                Gehandelte Trades
            </div>
            {goMarketTrades.length > 0
                ?
                <div className="main-opentrades-content">
                    {goMarketTrades.map((trade, i) =>
                        <div key={i} className="main-opentrades-content-trade">
                            <div className="main-opentrades-content-trade-text">
                                {` ${trade.id}: ${trade.aktie.label} Trailing-Stopp: ${formatDate(trade.trailing_stop_datum)}`}
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
                                <option value="CLOSED" >Setze auf Closed</option>
                                <option value="LÖSCHEN">Löschen</option>
                            </select>
                        </div>
                    )}
                </div>
                : loading
                    ? <Loader />
                    : <div>Keine aktiv gehandelten Trades!!!</div>}
        </div>
    )
}
