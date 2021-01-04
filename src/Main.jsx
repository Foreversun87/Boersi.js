import React from "react";
import MainGoMarketTrades from "./MainGoMarketTrades";
import MainOpenTrades from "./MainOpenTrades";
import MainStrategieTrades from "./MainStrategieTrades";

export default function Main() {
    return (
        <div className="main">
            <MainOpenTrades />
            <MainStrategieTrades />
            <MainGoMarketTrades />
        </div>
    )
}