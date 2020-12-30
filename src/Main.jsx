import React from "react";
import MainOpenTrades from "./MainOpenTrades";
import MainStrategieTrades from "./MainStrategieTrades";

export default function Main() {
    return (
        <div className="main">
            <MainOpenTrades />
            <MainStrategieTrades />
            <div className="main-content">
                Main-Content
            </div>
        </div>
    )
}