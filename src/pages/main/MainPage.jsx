import React from 'react';
import Main from "./components/Main";
import Layout from "../../layout/Layout";
export default function MainPage() {
    return (
        <div className="grid-container" >
            <Layout>
                <Main />
            </Layout>
        </div>
    )
}
