import React from "react";
import Main from "./Main";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useOpenTrade } from "./context/OpenTradeContext";
import ModalCreatedTrade from "./components/modal/openTrade/ModalOpenTrade";
import ModalStrategieTrade from "./components/modal/strategieTrade/ModalStrategieTrade";
import ModalGoMarketTrade from "./components/modal/gomarketTrade/ModalGoMarket";

import ModalGoMarketOnVista from "./components/modal/gomarketTrade/ModalGoMarketOnVista";
import ModalClosedTrade from "./components/modal/closedTrade/ModalClosedTrade";


function App() {
  const { state: { isSidebarShow } } = useOpenTrade();
  return (
    <div className="grid-container" >
      <ModalGoMarketOnVista />
      <ModalCreatedTrade />
      <ModalStrategieTrade />
      <ModalGoMarketTrade />
      <ModalClosedTrade />
      {isSidebarShow && <Sidebar />}
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
