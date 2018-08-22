import React from "react";
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import MainContainer from "./containers/MainContainer";
import Home from "./panels/Home";
import Work from "./panels/Work";
import Skills from "./panels/Skills";
import Education from "./panels/Education";
import Contact from "./panels/Contact";

class Container extends React.Component {
    render() {
        return [
            <Home key={'home'}/>,
            <Skills key={'skills'}/>,
            <Work key={'Work'}/>,
            <Education key={'education'}/>,
            <Contact key={'contact'}/>,
        ];
    }
}

export default class extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <MainContainer>
                    <Route exact path="*" component={Container} />
                </MainContainer>
            </BrowserRouter>
        )
    }
}
