import React from 'react';

export default function DataTable() {
    const [closedTrades, setClosedTrades] = React.useState([]);
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
                        return (
                            <tr key={trade.id}>
                                <td>{trade.id}</td>
                                <td>{trade.aktie.label}</td>
                                <td>{trade.einkaufsdatum}</td>
                                <td>{trade.verkaufsdatum}</td>
                                <td>{trade.einkaufskurs.toString().replace(".", ",")} €</td>
                                <td>{trade.verkaufskurs.toString().replace(".", ",")} €</td>
                                <td>{trade.zielkurs.toString().replace(".", ",")} €</td>
                                <td>{trade.stueckzahl.toString().replace(".", ",")} </td>
                                <td ></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
