import React from 'react';
import { useSearchbar } from "./context/SearchbarContext";

export default function MainStrategieTrades() {
    const { strategieTrades } = useSearchbar();
    console.log(strategieTrades)
    return (
        <div className="main-strategie">
            <div className="main-opentrades-header">
                Strategie der Trades
            </div>
            <div className="main-strategie-content">
                {strategieTrades.map((e, i) =>
                    <div key={i} className="main-opentrades-content-trade">
                        <div className="main-opentrades-content-trade-text">
                            {e.id}: {e.aktie.label}
                        </div>
                        <select
                            value=""
                            name="123"
                            id="status"
                            className="main-opentrades-content-trade-select"
                        // onChange={(evt) => onChangeOption(evt, trade)}
                        >
                            <option value=""  > </option>
                            <option value="HANDELN" >Setze auf Handel</option>
                            <option value="LÖSCHEN">Löschen</option>
                        </select>
                    </div>
                )}
            </div>
        </div>
    )
}
