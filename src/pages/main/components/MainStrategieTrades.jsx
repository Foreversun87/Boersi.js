import React from 'react';
import Loader from '../../../components/Loader';

export default function MainStrategieTrades() {

    const [strategieTrades, setStrategieTrades] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    function onChangeOption(evt, trade) {

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
