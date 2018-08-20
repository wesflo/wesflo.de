import React from "react";
import Home from "./Home";
import Vitae from "./Vitae";

export default class extends React.Component {
    render() {
        return (
            <div>
               <h1>Root</h1>
                <Home />
                <Vitae />
            </div>
        )
    }
}
