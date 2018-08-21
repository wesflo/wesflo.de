import React from "react";
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import ScrollRouter from "./controllers/ScrollRouter";
import MainNav from "./containers/MainNav";
import Home from "./panels/Home";
import Vitae from "./panels/Vitae";
import Skills from "./panels/Skills";

class Container extends React.Component {
    render() {
        return [
            <Home key={'home'}/>,
            <Skills key={'skills'}/>,
            <Vitae key={'vitae'}/>
        ];
    }
}

export default class extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <ScrollRouter>
                    <MainNav />
                    <Route exact path="*" component={Container} />
                </ScrollRouter>
            </BrowserRouter>
        )
    }
}
