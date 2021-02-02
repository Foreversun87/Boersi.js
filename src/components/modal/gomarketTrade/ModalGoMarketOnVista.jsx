import React from 'react';
import Modal from "react-modal";
import { ModalGoMarketOnVistaStyles } from "../modal-style";
import { ACTION } from '../../../reducer/action';
import { useGoMarketTrade } from '../../../context/GoMarketTradeContext';
import { isBefore } from "./../../../helper/formatDate";

Modal.setAppElement("#root");

export default function ModalGoMarketOnVista() {
    const [trailingDate, setTrailingDate] = React.useState("");
    const { state: { isGoMarketOnVista, goMarketTrade }, showModalGoMarketOnVista, goMarketOnVista, dispatch_gomarket } = useGoMarketTrade();

    function cancel() {
        showModalGoMarketOnVista();
        setTrailingDate("");
        dispatch_gomarket({ type: ACTION.SETGOMARKETTRADE, payload: null });
    }

    function onSubmit(event, goMarketTrade, trailingDate) {
        event.preventDefault();

        isBefore(trailingDate)
            ? alert("Bitte ein zukünftiges Datum eintragen")
            : goMarketOnVista(goMarketTrade, trailingDate);
        cancel();
    }

    return (
        <Modal shouldCloseOnEsc={true} onRequestClose={cancel} style={ModalGoMarketOnVistaStyles} isOpen={isGoMarketOnVista} >
            <div >
                <h1>Du willst die Aktie <span>{goMarketTrade ? (`${goMarketTrade.id}: ${goMarketTrade.aktie.label}`) : null}</span> kaufen</h1>
                <hr></hr>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <span>Einkaufskurs: </span><span stlye={{ flex: 1 }}>{goMarketTrade ? goMarketTrade.einkaufskurs : null}€</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <span>Stoppkurs: </span><span>{goMarketTrade ? goMarketTrade.stoppkurs : null}€</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <span>Zielkurs: </span><span>{goMarketTrade ? goMarketTrade.zielkurs : null}€</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <span>Stückzahl: </span><span>{goMarketTrade ? goMarketTrade.stueckzahl : null}</span>
                </div>
                <hr></hr>
                <form onSubmit={(event) => onSubmit(event, goMarketTrade, trailingDate)}>
                    <div>
                        <input type="date" required onChange={(e) => setTrailingDate(e.target.value)} value={trailingDate} /><span>Traillingdatum</span>
                    </div>
                    <button >OK</button>
                    <button onClick={() => cancel()}>Abbrechen</button>
                </form>
            </div>
        </Modal>
    )
}

