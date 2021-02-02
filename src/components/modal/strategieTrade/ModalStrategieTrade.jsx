import React from 'react';
import { useStrategieTrade } from "../../../context/StrategieTradeContext";
import Modal from "react-modal";
import { customStyles } from "../modal-style";
import WYSIWYG from '../../WYSIWYG';
import Draft from "../../Draft.jsx";
import { useLogin } from '../../../context/LoginContext';
import { ACTION } from '../../../reducer/action';
import { calculations } from "../../../helper/strategieMath";

Modal.setAppElement("#root");

export default function ModalStrategieTrade() {
    const [editorState, setEditorState] = React.useState(null);
    const { state: { depot, user } } = useLogin();
    const { state: { isStrategieTrade, strategieTrade }, updateTrade, showModalStrategieNewTrade, dispatch_strategie } = useStrategieTrade();
    const [input, setInput] = React.useState({ einkaufskurs: "", stoppkurs: "", zielkurs: "" });
    const [calc, setCalc] = React.useState(null)

    React.useEffect(() => {
        if (strategieTrade) {
            setEditorState(JSON.parse(strategieTrade.description));
            if (strategieTrade.einkaufskurs) {
                setInput(prevInput => { return { ...prevInput, einkaufskurs: strategieTrade.einkaufskurs } })
            }

            if (strategieTrade.stoppkurs) {
                setInput(prevInput => { return { ...prevInput, stoppkurs: strategieTrade.stoppkurs } })
            }

            if (strategieTrade.zielkurs) {
                setInput(prevInput => { return { ...prevInput, zielkurs: strategieTrade.zielkurs } })
            }

            console.log(strategieTrade)
        }
    }, [strategieTrade]);

    React.useEffect(() => {
        if (depot) {
            setCalc(calculations({ depot, input }));
        }

    }, [input]);

    // Wenn ich OK klicke, passiert diese Funktion
    function onSubmit(event, strategieTrade, input, calc) {
        event.preventDefault();
        console.log(calc.gUV)
        if (input.einkaufskurs === "" || input.stoppkurs === "" || input.zielkurs === "" || calc.gUV < 1) {
            if (input.einkaufskurs === "") {
                alert("Bitte einen Einkaufskurs eingeben");
            } else if (input.stoppkurs === "") {
                alert("Bitte einen Stoppkurs eingeben");
            } else if (input.zielkurs === "") {
                alert("Bitte einen Zielkurs eingeben");
            } else if (calc.gUV < 1) {
                alert("Achtung!!! GuV ist unter 1");
            }
        } else {
            try {
                updateTrade(editorState, strategieTrade, input, calc);
            } catch (err) {
                // In catch-Block springt er nicht rein!!!
                alert("catch in ModalStrategieTrade")
            } finally {
                cancel();
            }
        }
    }

    function cancel() {
        showModalStrategieNewTrade();
        dispatch_strategie({ type: ACTION.SETSTRATEGIETRADE, payload: null });
        setCalc(null);
        setInput({ einkaufskurs: "", stoppkurs: "", zielkurs: "" });
    }

    return (
        <Modal shouldCloseOnEsc={true} onRequestClose={cancel} style={customStyles} isOpen={isStrategieTrade} >
            <div className={"modal-strategie-container"}>
                <div style={{ padding: "1rem 0", display: "flex" }}>
                    <span style={{ flex: 1 }}>
                        <div><b>ID</b></div>
                        {strategieTrade ? <div>{strategieTrade.id}</div> : <div>-</div>}
                    </span>
                    <span style={{ flex: 1 }}>
                        <div><b>Status</b></div>
                        {strategieTrade ? <div>{strategieTrade.status.bezeichnung}</div> : <div>-</div>}
                    </span>
                    <span style={{ flex: 1 }}>
                        <div><b>Wertpapier</b></div>
                        {strategieTrade ? <div>{strategieTrade.aktie.label}</div> : <div>-</div>}
                    </span>
                    <span style={{ flex: 1 }}>
                        <div><b>Risiko in %</b></div>
                        <div>{depot ? depot.risiko_per_trade + "%" : "-"}</div>
                    </span >
                    <span style={{ flex: 1 }}>
                        <div><b>Risiko in €</b></div>
                        <div>{calc ? calc.risikoProTradeInEuro + "€" : "-"}</div>
                    </span>
                    <span style={{ flex: 1 }}>
                        <div><b>Depotwert</b></div>
                        <div>
                            {depot
                                ? Number.parseFloat(depot.einlagen.toFixed(2)) + "€"
                                : "-"
                            }
                        </div>
                    </span>
                    <span>
                        <div><b>Inhaber</b></div>
                        <div>{user ? user.email : "-"}</div>
                    </span>
                </div>
                <div style={{ height: "70%", maxHeight: "70%" }}>
                    <WYSIWYG editorState={editorState} setEditorState={setEditorState} />
                    {/* <Draft /> */}
                </div>
                <form onSubmit={(event) => onSubmit(event, strategieTrade, input, calc)} style={{ padding: "1rem 0" }}>
                    <div>
                        <div>
                            <input onChange={(e) => setInput({ ...input, einkaufskurs: Number.parseFloat(e.target.value) })} type="number" name="einkaufskurs" step="0.01" value={input.einkaufskurs} placeholder="Einkaufskurs" />
                            <input onChange={(e) => setInput({ ...input, stoppkurs: Number.parseFloat(e.target.value) })} type="number" name="stoppkurs" step="0.01" value={input.stoppkurs} placeholder="Stoppkurs" />
                            <input onChange={(e) => setInput({ ...input, zielkurs: Number.parseFloat(e.target.value) })} type="number" name="zielkurs" step="0.01" value={input.zielkurs} placeholder="Zielkurs" />
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

