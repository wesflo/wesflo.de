import React from "react";
import {NavLink} from 'react-router-dom';
import navigation from '../config/navigation'

export default class extends React.Component {

    renderMainNav() {
        let nav = [];
        for(let key in navigation) {
            if (!navigation.hasOwnProperty(key)) continue;
            let link = navigation[key];

            nav.push(
                <NavLink {...link} key={key}>
                    {link.label}
                </NavLink>
            )
        }
        return nav;
    }

    render() {
        return (
            <nav className={'mainNav'}>
                {this.renderMainNav()}
            </nav>
        );
    }
}
