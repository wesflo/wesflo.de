import React from "react";
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import MainContainer from "./containers/MainContainer";
import MainNav from "./containers/MainNav";
import Home from "./panels/Home";
import Vitae from "./panels/Vitae";
import Skills from "./panels/Skills";
import Projects from "./panels/Projects";
import Interests from "./panels/Interests";
import Contact from "./panels/Contact";

class Container extends React.Component {
    render() {
        return [
            <Home key={'home'}/>,
            <Skills key={'skills'}/>,
            <Vitae key={'vitae'}/>,
            <Projects key={'projects'}/>,
            <Interests key={'interests'}/>,
            <Contact key={'contact'}/>,
        ];
    }
}

export default class extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <MainContainer>
                    <MainNav />
                    <Route exact path="*" component={Container} />
                </MainContainer>
            </BrowserRouter>
        )
    }
}
