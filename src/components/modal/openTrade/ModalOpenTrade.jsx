import React from 'react';
import { useOpenTrade } from "../../../context/OpenTradeContext";
import Modal from "react-modal";
import OpenSelect from '../OpenSelect';
import axios from "axios";
import WYSIWYG from "../../WYSIWYG";
import { ACTION } from '../../../reducer/action';
import {customStyles} from "../modal-style";

// https://github.com/JedWatson/react-select
// https://react-select.com/home#getting-started


// Modal.setAppElement("#root");

// 1. Multibox auswahl auf Bearbeiten
// 1.1 getUpdateTrade wird mit dem kompletten Trade belegt und
// 1.2 ModalOpenTrade wird geöffnet
// 1.3 Immer wenn ein neuer Trade ausgewählt wird, dann feuert useEffect und 
// 1.4 modalOpentradeInput wird belegt?

export default function ModalOpenTrade() {
    const { state: { isCreatedTrade, getUpdateTrade }, dispatch, createTrade, updateTrade, showModalCreatedNewTrade } = useOpenTrade();
    const [editorState, setEditorState] = React.useState(null);
    const [selectedOption, setSelectedOption] = React.useState("");
    const [stocks, setStocks] = React.useState([]);

    // Bei Auswahl Trade: bearbeiten, wird die passende Aktie sowie Beschreibung in das ModalNewTrade geladen
    React.useEffect(() => {
        if (getUpdateTrade) {
            setSelectedOption(getUpdateTrade.aktie.label);
            setEditorState(JSON.parse(getUpdateTrade.description));
        }
    }, [getUpdateTrade]);

    // Laden der Aktiendaten für Selectauswahl
    React.useEffect(async () => {
        try {
            let stocks = await axios.get("http://localhost:1337/akties");
            setStocks(stocks.data);
        } catch (err) {
            alert("Fehler beim Laden der Aktien");
        }

    }, []);

    // Anlegen oder Updaten eines Trades
    function onSubmit(e) {
        e.preventDefault();

        // getUpdateTrade wird gesetzt, wenn die Option: Tradebearbeiten ausgewählt wird.
        if (getUpdateTrade === null) {
            // Wurde eine Aktie ausgewählt?
            if (selectedOption === "") {
                alert("Bitte eine Aktie auswählen");
            } else {
                createTrade({ selectedOption, editorState });
            }
        } else {
            updateTrade(editorState, getUpdateTrade)
        }
        resetStates();
        console.log("onSubmit - editorState: ", { editorState, getUpdateTrade }, "   getUpdateTrade: ")
    }

    //Modalstates resetten, weil sonst werden diese angezeigt
    function resetStates() {
        setSelectedOption("");
        setEditorState(null);
        dispatch({ type: ACTION.SETUPDATETRADENULL });
    }

    // Beim drücken von dem Button Abbrechen
    function cancel() {
        resetStates();
        showModalCreatedNewTrade();
    }

    return (
        <Modal shouldCloseOnEsc={true} onRequestClose={() => cancel()} isOpen={isCreatedTrade} style={customStyles} contentLabel="Example Modal">
            <form onSubmit={onSubmit} className="sidebar-newtrade" >
                <OpenSelect stocks={stocks} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                <WYSIWYG editorState={editorState} setEditorState={setEditorState} />
                <div >
                    <button style={{ margin: "1rem 0", width: "100px", backgroundColor: "gray", color: "white" }}>OK</button>
                    <button onClick={() => cancel()} style={{ margin: "1rem 0", width: "100px", backgroundColor: "gray", color: "white" }}>Abbrechen</button>
                </div>
            </form>
        </Modal>
    )
}
