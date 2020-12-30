import React from "react";
import { useOpenTrade } from "./context/OpenTradeContext";
import {ACTION} from "./reducer/action";

export default function Sidebar() {
    const { dispatch } = useOpenTrade();

    return (
        <div className="sidebar">
            <div className="sidebar-brandwrapper">
                <div className="sidebar-brand">
                    <span className="sidebar-brand-span" onClick={() => dispatch({ type: ACTION.TOGGLESIDEBAR })} >Börsi</span>
                </div>
                <div>
                    <div className="sidebar-links" >
                        <div className="sidebar-links-link">Neuen Trade erstellen</div>
                    </div>
                    <div className="sidebar-links">
                        <div className="sidebar-links-link">TestLink</div>
                    </div>
                    <div className="sidebar-links">
                        <div className="sidebar-links-link">TestLink1</div>
                    </div>
                </div>
            </div>
        </div>
    )
}