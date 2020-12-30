import React from "react";
import { useOpenTrade } from "./OpenTradeContext";
const SearchbarContext = React.createContext();
export function useSearchbar() {
  return React.useContext(SearchbarContext);
}

export const SearchbarProvider = ({ children }) => {
  const { state: { initalTrades } } = useOpenTrade();
  const [input, setInput] = React.useState("");

  const [openTrades, setOpenTrades] = React.useState(() =>
    initalTrades.filter(trade => trade.status.id === 1)
  );
  const [strategieTrades, setStrategieTrades] = React.useState(() =>
    initalTrades.filter(trade => trade.status.id === 2));

  const [goMarketTrades, setGoMarketTrades] = React.useState(() =>
    initalTrades.filter(trade => trade.status.id === 3));

  const [closedTrades, setClosedTrades] = React.useState(() =>
    initalTrades.filter(trade => trade.status.id === 4));

  React.useEffect(() => {
    setInput("");
    setOpenTrades(() => initalTrades.filter(trade => trade.status.id === 1));
  }, [initalTrades])

  React.useEffect(() => {
    setInput("");
    setStrategieTrades(() => initalTrades.filter(trade => trade.status.id === 2));
  }, [initalTrades])

  React.useEffect(() => {
    setInput("");
    setGoMarketTrades(() => initalTrades.filter(trade => trade.status.id === 3));
  }, [initalTrades])

  React.useEffect(() => {
    setInput("");
    setClosedTrades(() => initalTrades.filter(trade => trade.status.id === 4));
  }, [initalTrades])



  function onChangeSearchbar(e) {
    setOpenTrades(initalTrades.filter(trade => trade.aktie.value.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 && trade.status.id === 1))
    setStrategieTrades(initalTrades.filter(trade => trade.aktie.value.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 && trade.status.id === 2))
    setGoMarketTrades(initalTrades.filter(trade => trade.aktie.value.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 && trade.status.id === 3))
    setClosedTrades(initalTrades.filter(trade => trade.aktie.value.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 && trade.status.id === 4))
    setInput(e.target.value)
  }

  const values = { openTrades, strategieTrades, goMarketTrades, closedTrades, input, onChangeSearchbar }
  return (
    <SearchbarContext.Provider value={values}>
      {children}
    </SearchbarContext.Provider>
  )
}

