import React from 'react';
import { useStrategieTrade } from "../../../context/StrategieTradeContext";
import Modal from "react-modal";
import { customStyles } from "../modal-style";
import WYSIWYG from '../../WYSIWYG';
import { useLogin } from '../../../context/LoginContext';
import { ACTION } from '../../../reducer/action';
import { calculations } from "../../../helper/strategieMath";
import { useGoMarketTrade } from '../../../context/GoMarketTradeContext';

Modal.setAppElement("#root");

export default function ModalGoMarketTrade() {
    const [editorState, setEditorState] = React.useState(null);
    const [input, setInput] = React.useState({ einkaufskurs: "", stoppkurs: "", zielkurs: "" });
    const [trailingDate, setTrailingDate] = React.useState("");
    const [calc, setCalc] = React.useState(null)
    const { state: { depot } } = useLogin();
    const { updateTrade } = useStrategieTrade();
    const { state: { isGoMarketTrade, goMarketTrade }, showModalGoMarketNewTrade, dispatch_gomarket } = useGoMarketTrade();


    React.useEffect(() => {
        if (goMarketTrade) {
            setEditorState(JSON.parse(goMarketTrade.description));
            if (goMarketTrade.einkaufskurs) {
                setInput(prevInput => { return { ...prevInput, einkaufskurs: goMarketTrade.einkaufskurs } })
            }

            if (goMarketTrade.stoppkurs) {
                setInput(prevInput => { return { ...prevInput, stoppkurs: goMarketTrade.stoppkurs } })
            }

            if (goMarketTrade.zielkurs) {
                setInput(prevInput => { return { ...prevInput, zielkurs: goMarketTrade.zielkurs } })
            }
            if (goMarketTrade.trailing_stop_datum) {

                let datum = goMarketTrade.trailing_stop_datum.split("T")[0];
                setTrailingDate(datum)
            }

            console.log(goMarketTrade)
        }
    }, [goMarketTrade]);

    React.useEffect(() => {
        if (depot) {
            setCalc(calculations({ depot, input }));
        }

    }, [input]);

    // Wenn ich OK klicke, passiert diese Funktion
    function onSubmit(event, goMarketTrade, input, calc, trailingDate) {
        event.preventDefault();
        if (input.einkaufskurs === "" || input.stoppkurs === "" || input.zielkurs === "") {
            if (input.stoppkurs === "") {
                alert("Bitte einen Stoppkurs eingeben");
            } else if (input.zielkurs === "") {
                alert("Bitte einen Zielkurs eingeben");
            }
        } else {
            try {
                updateTrade(editorState, goMarketTrade, input, calc, trailingDate);
            } catch (err) {
                // In catch-Block springt er nicht rein!!!
                alert("catch in ModalStrategieTrade")
            } finally {
                cancel();
            }
        }
    }

    function cancel() {
        showModalGoMarketNewTrade();
        setTrailingDate("");
        dispatch_gomarket({ type: ACTION.SETGOMARKETTRADE, payload: null });
    }

    return (
        <Modal shouldCloseOnEsc={true} onRequestClose={cancel} style={customStyles} isOpen={isGoMarketTrade} >
            <div className={"modal-strategie-container"}>
                <div style={{ padding: "1rem 0", display: "flex" }}>
                    <span style={{ flex: 1 }}>
                        <div><b>ID</b></div>
                        {goMarketTrade ? <div>{goMarketTrade.id}</div> : <div>-</div>}
                    </span>
                    <span style={{ flex: 1 }}>
                        <div><b>Status</b></div>
                        {goMarketTrade ? <div>{goMarketTrade.status.bezeichnung}</div> : <div>-</div>}
                    </span>
                    <span style={{ flex: 1 }}>
                        <div><b>Wertpapier</b></div>
                        {goMarketTrade ? <div>{goMarketTrade.aktie.label}</div> : <div>-</div>}
                    </span>
                    <span style={{ flex: 1 }}>
                        <div><b>Risiko in %</b></div>
                        <div>{depot ? depot.risiko_per_trade + "%" : "-"}</div>
                    </span >
                    <span style={{ flex: 1 }}>
                        <div><b>Risiko in €</b></div>
                        <div>{depot ? depot.einlagen * depot.risiko_per_trade / 100 + "€" : "-"}</div>
                    </span>
                    <span style={{ flex: 1 }}>
                        <div><b>Depotwert</b></div>
                        <div>{depot ? depot.einlagen + "€" : "-"}</div>
                    </span>
                    <span>
                        <div><b>Inhaber</b></div>
                        <div>{depot ? depot.users_permissions_user.email : "-"}</div>
                    </span>
                </div>
                <div style={{ height: "70%", maxHeight: "70%" }}>
                    <WYSIWYG editorState={editorState} setEditorState={setEditorState} />
                    {/* <Draft /> */}
                </div>
                <form onSubmit={(event) => onSubmit(event, goMarketTrade, input, calc, trailingDate)} style={{ padding: "1rem 0" }}>
                    <div>
                        <div>
                            <input disabled onChange={(e) => setInput({ ...input, einkaufskurs: Number.parseFloat(e.target.value) })} type="number" name="einkaufskurs" step="0.01" value={input.einkaufskurs} placeholder="Einkaufskurs" />
                            <input onChange={(e) => setInput({ ...input, stoppkurs: Number.parseFloat(e.target.value) })} type="number" name="stoppkurs" step="0.01" value={input.stoppkurs} placeholder="Stoppkurs" />
                            <input onChange={(e) => setInput({ ...input, zielkurs: Number.parseFloat(e.target.value) })} type="number" name="zielkurs" step="0.01" value={input.zielkurs} placeholder="Zielkurs" />
                            <input type="date" required onChange={(e) => setTrailingDate(e.target.value)} value={trailingDate} /><span>Traillingdatum</span>
                        </div>
                        <div style={{ display: "flex", width: "30%" }} >

                            <span style={{ flex: 1 }}>
                                Einkauf

                            </span>

                            <span style={{ flex: 1 }}>
                                Stopp

                            </span>

                            <span style={{ flex: 1 }}>
                                Ziel
                            </span>
                        </div>

                    </div>

                    <div style={{ display: "flex", width: "60%" }}>
                        <span style={{ flex: 1 }}>
                            <div>
                                Gewinn €
                            </div>
                            <div>
                                {calc ? calc.gewinn.gewinnEuro : null}
                            </div>
                        </span>

                        <span style={{ flex: 1 }}>
                            <div>
                                Gewinn %
                            </div>
                            <div>
                                {calc ? calc.gewinn.gewinnProzent : null}
                            </div>
                        </span>

                        <span style={{ flex: 1 }}>
                            <div>
                                Stückzahl
                            </div>
                            <div>
                                {calc ? calc.stueckZahl : null}
                            </div>
                        </span>

                        <span style={{ flex: 1 }}>
                            <div>
                                GuV
                            </div>
                            <div>
                                {calc ? calc.gUV : null}
                            </div>
                        </span>

                        <span style={{ flex: 1 }}>
                            <div>
                                Verlust %
                            </div>
                            <div>
                                {calc ? calc.verlustInProzent : null}
                            </div>
                        </span>

                    </div>
                    <div >
                        <button style={{ margin: "2rem 0", width: "100px", backgroundColor: "gray", color: "white" }} >OK</button>
                        <button style={{ margin: "2rem 0", width: "100px", backgroundColor: "gray", color: "white" }} onClick={cancel}>Abbrechen</button>
                    </div>
                </form>

            </div>
        </Modal>
    )
}

