import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./style.css";
import { OpenTradeProvider } from "./context/OpenTradeContext";
import { StrategieTradeProvider } from "./context/StrategieTradeContext";
import { GoMarketTradeProvider } from "./context/GoMarketTradeContext";
import { LoginProvider } from "./context/LoginContext";
import { ClosedTradeProvider } from './context/ClosedTradeContext';
import { SearchbarProvider } from "./context/SearchbarContext";

ReactDOM.render(
  <LoginProvider>
    <OpenTradeProvider>
      <StrategieTradeProvider>
        <GoMarketTradeProvider>
          <ClosedTradeProvider>
            <SearchbarProvider>
              <App />
            </SearchbarProvider>
          </ClosedTradeProvider>
        </GoMarketTradeProvider>
      </StrategieTradeProvider>
    </OpenTradeProvider>
  </LoginProvider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
