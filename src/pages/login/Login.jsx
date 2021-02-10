import React from 'react';
import "./login.css";
import { withRouter, useHistory, useLocation, Redirect } from "react-router-dom";

function Login() {
    const [input, setInput] = React.useState({ identifier: "", password: "" });
    const history = useHistory();
    

    console.log(useLocation(), history);

    function onSubmit(e) {
        e.preventDefault();
        history.push("/main");
    }

    return (
        <div className="login">
            <div className="login-container">
                <div className="login-brand">
                    Börsi
                </div>
                <form onSubmit={onSubmit} className="login-form">
                    <input value={input.identifier} name="identifier" onChange={(e) => setInput({ ...input, identifier: e.target.value })}
                        className="login-input" placeholder="email" type="text" />
                    <input value={input.password} name="password" onChange={(e) => setInput({ ...input, password: e.target.value })}
                        className="login-input" placeholder="password" type="password" />
                    <div className="login-link">Passwort vergessen?</div>
                    <div className="login-button-container">
                        <span className="login-link">Neues Konto erstellen</span>
                        <button className="login-button">Anmelden</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default withRouter(Login);