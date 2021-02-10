import React from "react";
import { withRouter, useHistory } from "react-router-dom";


function Navbar({ isSidebarShow, setIsSidebarShow }) {
    const history = useHistory();


    function logout(e) {
        history.push("/");
    }

    return (
        <div className="navbar">
            <div className="navbar-brand"  >
                <span className="navbar-brand-span" onClick={() => setIsSidebarShow(!isSidebarShow)} >Börsi</span>
            </div>
            <div className="navbar-searchbar">
                <label htmlFor="search" >
                    <input id="search" type="text" placeholder="Welche Aktie suchst du?" />
                </label>
            </div>
            <div className="navbar-login">
                <div onClick={logout}  >
                    Log OUT
                </div>
                <div>
                </div>
            </div>
        </div >
    )
}

export default withRouter(Navbar);