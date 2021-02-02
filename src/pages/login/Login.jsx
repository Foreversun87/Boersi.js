import React from 'react';
import { useLogin } from "./../../context/LoginContext";
import "./login.css";

export default function Login() {
    const { state: { error }, login } = useLogin();
    const [input, setInput] = React.useState({ identifier: "", password: "" });

    function onSubmit(e) {
        e.preventDefault();
        login(input);
    }

    return (
        <div className="login">
            <div className="login-container">
                <div className="login-brand">
                    Börsi
                </div>
                <form onSubmit={onSubmit} className="login-form">
                    {error === 0 ? `Serverproblem` : error === 429 ? "Zu viele Fehlversuche" : error === 400 ? "Password or Email wrong" : null}
                    <div className={error ? "login-form-error" : "login-form-success"}>
                        <input value={input.identifier} name="identifier" onChange={(e) => setInput({ ...input, identifier: e.target.value })}
                            className="login-input" placeholder="email" type="text" />
                        <input value={input.password} name="password" onChange={(e) => setInput({ ...input, password: e.target.value })}
                            className="login-input" placeholder="password" type="password" />
                        <div className="login-link">Passwort vergessen?</div>
                    </div>
                    <div className="login-button-container">
                        <span className="login-link">Neues Konto erstellen</span>
                        <button className="login-button">Anmelden</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
