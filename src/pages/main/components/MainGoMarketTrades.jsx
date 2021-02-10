import React from 'react';
import Loader from '../../../components/Loader';


export default function MainGoMarketTrades() {
    const [goMarketTrades, setGoMarketTrades] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    function onChangeOption(evt, trade) {
        

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
                                {` 
                                ${trade.id}: ${trade.aktie.label} 
                                
                                
                                Zielkurs: ${trade.zielkurs}€
                                
                                Stoppkurs: ${trade.stoppkurs}€
                                `}
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
