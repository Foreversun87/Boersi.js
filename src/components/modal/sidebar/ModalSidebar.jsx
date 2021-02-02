import React from 'react';
import { ModalSidebarStyles } from "./../modal-style";
import Modal from "react-modal";
import { Link } from "react-router-dom";

export default function ModalSidebar({ isSidebarShow, setIsSidebarShow }) {
    function cancel() {
        setIsSidebarShow(!isSidebarShow);
    }

    return (
        <Modal shouldCloseOnEsc={true} onRequestClose={cancel} style={ModalSidebarStyles} isOpen={isSidebarShow} >
            <div className="sidebar-brandwrapper">
                <div className="sidebar-brand">
                    <span className="sidebar-brand-span" onClick={() => setIsSidebarShow(!isSidebarShow)} >Börsi</span>
                </div>
                <div>
                    <div className="sidebar-links" >
                        <Link onClick={() => setIsSidebarShow(!isSidebarShow)} to="/main" className="sidebar-links-link">Main</Link>
                    </div>
                    <div className="sidebar-links">
                        <Link onClick={() => setIsSidebarShow(!isSidebarShow)} to="/view" className="sidebar-links-link">Abgeschlossene Trades</Link>
                    </div>
                    <div className="sidebar-links">
                        <a className="sidebar-links-link" href="https://webtrading.onvista-bank.de/login" target="_blank">OnVista</a>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
