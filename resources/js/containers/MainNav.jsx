import React from "react";
import {NavLink} from 'react-router-dom';
import navigation from '../config/navigation'

export default class extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            navOpen: false
        }
    }

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
                <NavLink {...props} onClick={this.toggleMenu}>
                    {link.label}
                </NavLink>
            )
        }
        return nav;
    }

    toggleMenu = () =>{
        let {navOpen} = this.state;
        this.setState({navOpen: !navOpen});
    };

    render() {
        let {navOpen} = this.state;

        return (
            <div className={`mainNav ${navOpen ? 'showMenu' : ''}`}>
                <button type={'button'} className={`btn menuBtn ${navOpen ? 'cross' : ''}`} onClick={this.toggleMenu}>
                    <span> </span>
                </button>
                <div className={'navWrapper'}>
                    <nav>
                        {this.renderMainNav()}
                    </nav>
                </div>
            </div>

        );
    }
}
