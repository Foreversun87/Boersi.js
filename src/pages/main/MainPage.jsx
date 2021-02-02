import React from 'react';
import Main from "./components/Main";

import ModalCreatedTrade from "./../../components/modal/openTrade/ModalOpenTrade";
import ModalStrategieTrade from "./../../components/modal/strategieTrade/ModalStrategieTrade";
import ModalGoMarketTrade from "./../../components/modal/gomarketTrade/ModalGoMarket";
import ModalGoMarketOnVista from "./../../components/modal/gomarketTrade/ModalGoMarketOnVista";
import ModalClosedTrade from "./../../components/modal/closedTrade/ModalClosedTrade";

import Layout from "../../layout/Layout";

export default function MainPage() {
    return (
        <div className="grid-container" >
            <Layout>
                <ModalGoMarketOnVista />
                <ModalCreatedTrade />
                <ModalStrategieTrade />
                <ModalGoMarketTrade />
                <ModalClosedTrade />
                <Main />
            </Layout>
        </div>
    )
}
