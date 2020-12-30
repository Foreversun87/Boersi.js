import React from "react";
import { useSearchbar } from "./context/SearchbarContext";
// import { ReactComponent as SearchIcon } from './images/search-solid.svg';
import { useOpenTrade } from "./context/OpenTradeContext";
import { ACTION } from "./reducer/action";
import { useLogin } from "./context/LoginContext";

export default function Navbar() {
    const {dispatch_login} = useLogin();
    const { dispatch } = useOpenTrade();
    const { input, onChangeSearchbar } = useSearchbar();
    return (
        <div className="navbar">
            <div className="navbar-brand" onClick={() => dispatch({ type: ACTION.TOGGLESIDEBAR })} >
                <span >Börsi</span>
            </div>
            <div className="navbar-searchbar">
                <label htmlFor="search" >
                    <input value={input} onChange={onChangeSearchbar} id="search" type="text" placeholder="Welche Aktie suchst du?" />
                </label>
            </div>
            <div className="navbar-login">
                <div onClick={() => dispatch_login({type: ACTION.SETLOGIN, payload: "LOGIN"}) }>
                    Log IN
                </div>
                <div onClick={() => dispatch_login({type: ACTION.SETLOGIN, payload: "LOGOUT"}) } >
                    Log OUT
                </div>
            </div>
        </div >
    )
}