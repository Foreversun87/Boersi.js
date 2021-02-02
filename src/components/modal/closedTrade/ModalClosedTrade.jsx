import React from 'react';
import Modal from "react-modal";
import { ModalClosedTradeStyles } from "../modal-style";
import { ACTION } from '../../../reducer/action';
import { useLogin } from '../../../context/LoginContext';
import { useClosedTrade } from '../../../context/ClosedTradeContext';

Modal.setAppElement("#root");

export default function ModalClosedTrade() {
    const { state: { depot } } = useLogin();
    const [input, setInput] = React.useState("");
    const { state: { isClosedTrade, closedTrade }, showModalClosedNewTrade, dispatch_closed, closedTradeFn, changeDepotIncome } = useClosedTrade();

    function cancel() {
        showModalClosedNewTrade();
        setInput("");
        dispatch_closed({ type: ACTION.SETCLOSEDTRADE, payload: null });
    }

    function onSubmit(event, closedTrade, input) {
        event.preventDefault();
        closedTradeFn(closedTrade, input);
        changeDepotIncome(depot, closedTrade, input);
        cancel();
    }

    return (
        <Modal shouldCloseOnEsc={true} onRequestClose={cancel} style={ModalClosedTradeStyles} isOpen={isClosedTrade} >
            <div >
                <h1>Du willst die Aktie <span>{closedTrade ? (`${closedTrade.id}: ${closedTrade.aktie.label}`) : null}</span> abschließen?</h1>
                <hr></hr>
                <form onSubmit={(event) => onSubmit(event, closedTrade, input)}>
                    <div>
                        <input type="number" required onChange={(e) => setInput(e.target.value)} value={input} step="0.01" /><span>Verkaufskurs</span>
                    </div>
                    <button >OK</button>
                    <button onClick={() => cancel()}>Abbrechen</button>
                </form>
            </div>
        </Modal>
    )
}

