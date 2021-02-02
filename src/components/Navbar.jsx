import React from "react";
import { useSearchbar } from "./../context/SearchbarContext";
// import { ReactComponent as SearchIcon } from './images/search-solid.svg';
import { useLogin } from "./../context/LoginContext";

export default function Navbar({ isSidebarShow, setIsSidebarShow }) {
    const { state: { depot }, logout } = useLogin();
    const { input, onChangeSearchbar } = useSearchbar();
    return (
        <div className="navbar">
            <div className="navbar-brand"  >
                <span className="navbar-brand-span" onClick={() => setIsSidebarShow(!isSidebarShow)} >Börsi</span>
            </div>
            <div className="navbar-searchbar">
                <label htmlFor="search" >
                    <input value={input} onChange={onChangeSearchbar} id="search" type="text" placeholder="Welche Aktie suchst du?" />
                </label>
            </div>
            <div className="navbar-login">
                <div onClick={() => logout()} >
                    Log OUT
                </div>
                <div>
                    {Number.parseFloat(depot.einlagen).toFixed(2).toString().replace(".", ",")} €
                </div>
            </div>
        </div >
    )
}