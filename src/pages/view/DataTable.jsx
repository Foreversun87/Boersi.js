import React from 'react';
import { useSearchbar } from "../../context/SearchbarContext";
import { calculationsView } from "../../helper/strategieMath";
import { formatDate } from "../../helper/formatDate";
import { useLogin } from '../../context/LoginContext';

export default function DataTable() {
    const { closedTrades } = useSearchbar();
    const { state: { depot } } = useLogin();
    console.log(depot);
    return (
        <div style={{ overflowX: "auto" }}>
            <table id="download" >
                <thead>
                    <tr>
                        <th>Trade-ID</th>
                        <th>Aktie</th>
                        <th>Einkaufsdatum</th>
                        <th>Verkaufsdatum</th>
                        <th>Einkaufskurs</th>
                        <th>Verkaufskurs</th>
                        <th>Zielkurs</th>
                        <th>Stückzahl</th>
                        <th>Gewinn</th>
                    </tr>
                </thead>
                <tbody>
                    {closedTrades.map((trade) => {

                        let calc = calculationsView({
                            stueckzahl: trade.stueckzahl,
                            input: {
                                einkaufskurs: trade.einkaufskurs,
                                stoppkurs: trade.stoppkurs,
                                zielkurs: trade.zielkurs,
                                verkaufskurs: trade.verkaufskurs
                            },
                        })
                        console.log(trade.verkaufskurs.toString().replace(".", ","));
                        return (
                            <tr key={trade.id}>
                                <td>{trade.id}</td>
                                <td>{trade.aktie.label}</td>
                                <td>{formatDate(trade.einkaufsdatum)}</td>
                                <td>{formatDate(trade.verkaufsdatum)}</td>
                                <td>{trade.einkaufskurs.toString().replace(".", ",")} €</td>
                                <td>{trade.verkaufskurs.toString().replace(".", ",")} €</td>
                                <td>{trade.zielkurs.toString().replace(".", ",")} €</td>
                                <td>{trade.stueckzahl.toString().replace(".", ",")} </td>
                                <td className={calc.realGewinn < 0 ? "negativ" : null}>{calc.realGewinn.toString().replace(".", ",")} €</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
