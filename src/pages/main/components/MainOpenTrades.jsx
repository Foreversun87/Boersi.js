import React from 'react';
import Loader from '../../../components/Loader';

export default function MainOpenTrades() {
    const [openTrades, setOpenTrades] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    function onChangeOption(evt, trade) {

    }

    return (
        <div className="main-opentrades">
            <div className="main-opentrades-header">
                Eröffne Trades
            </div>
            {openTrades.length > 0
                ?
                <div className="main-opentrades-content">
                    {
                        openTrades.map((trade, i) =>
                            <div key={i} className="main-opentrades-content-trade">
                                <div className="main-opentrades-content-trade-text">

                                </div>
                                <select
                                    value=""
                                    name="123"
                                    id="status"
                                    className="main-opentrades-content-trade-select"
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
