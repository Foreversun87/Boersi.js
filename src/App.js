import React from "react";
import Main from "./Main";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useOpenTrade } from "./context/OpenTradeContext";
import ModalCreatedTrade from "./components/modal/openTrade/ModalOpenTrade";
import ModalStrategieTrade from "./components/modal/strategieTrade/ModalStrategieTrade";
import { SearchbarProvider } from "./context/SearchbarContext";


function App() {
  const { state: { isSidebarShow } } = useOpenTrade();
  return (
    <div className="grid-container" >
      <ModalCreatedTrade />
      <ModalStrategieTrade />
      {isSidebarShow && <Sidebar />}
      <SearchbarProvider>
        <Navbar />
        <Main />
      </SearchbarProvider>
    </div>
  );
}

export default App;
