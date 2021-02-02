import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import LoginProvider from "./context/LoginContext";
import App from './App';

import "./index.css";
import "./pages/main/main.css";

ReactDOM.render(
    <BrowserRouter>
        <LoginProvider>
            <App />
        </LoginProvider>
    </BrowserRouter>
    , document.getElementById('root'));
