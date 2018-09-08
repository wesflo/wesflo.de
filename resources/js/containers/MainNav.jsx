import React from "react";
import {NavLink} from 'react-router-dom';
import navigation from '../config/navigation'

export default class extends React.Component {

    renderMainNav() {
        let nav = [];
        for(let key in navigation) {
            if (!navigation.hasOwnProperty(key)) continue;
            let link = navigation[key];
            let props = {
                to: link.to,
                key: key,
                className: key,
            };

            nav.push(
                <NavLink {...props}>
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
