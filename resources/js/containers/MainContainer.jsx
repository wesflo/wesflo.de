import React from "react";
import {withRouter} from "react-router-dom";
import navigation from "../config/navigation";
import MainNav from "./MainNav";

class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePanelIndex: 0,
            triangleClassName: 'hidden',
            triangleTxt: null,
        };
        this.panelCount = Object.keys(navigation).length;
        this.scrollHandler = 'scrollBehavior' in document.documentElement.style ? this.scrollIntoView : this.animateScrolling;
        this.scrollTimeout = null;

        this.addEvents();
        this.checkLocation(this.props.location.pathname);
    }

    addEvents() {
        let prefix = !('onwheel' in document.createElement('div')) ? 'mouse' : '';

        window.addEventListener('scroll', this.onScroll);
        document.addEventListener(`${prefix}wheel`, this.onMouseWheel); //IE9, Chrome, Safari, Opera
    }

    componentWillUpdate(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.checkLocation(nextProps.location.pathname);
        }
    }

    checkLocation(pathname) {
        let key = pathname.split('/')[1];
        if(key && navigation[key]){
            this.setActivePanel(key);
        }
    }

    setActivePanel(key) {
        let keyPos = Object.keys(navigation).indexOf(key);
        this.setState({activePanelIndex: keyPos});

        let navigationObj = navigation[key];
        this.scrollHandler(key);

        setTimeout(() => {
            this.setState({
                triangleClassName: key,
                triangleTxt: navigationObj.label
            });
        }, 200);
    }

    animateScrolling(key) {
        console.log('animateScrolling', key);
    }

    scrollIntoView(key) {
        let panel = document.getElementById(`${key}Panel`);
        if(panel){
            panel.scrollIntoView({ block: 'end',  behavior: 'smooth' });
        }
    }

    onScroll = (e) => {
//        console.log(e);
//        e.preventDefault();
    };

    onMouseWheel = (e) => {
        let value = e.wheelDelta || -e.deltaY || -e.detail;
        let direction = Math.max(-1, Math.min(1, value)) * -1;

        window.clearTimeout(this.scrollTimeout);
        this.scrollTimeout = window.setTimeout(() => {
            let index = this.state.activePanelIndex + direction;
            if(index >= 0 && index < this.panelCount ) {
                this.setActivePanel(Object.keys(navigation)[index]);
            }
        }, 300);
        e.preventDefault();
    };

    render() {
        let {triangleClassName, triangleTxt} = this.state;
        return ([
            <MainNav key={'mainNav'}/>,
            <div className={`mainTriangle ${triangleClassName}`} key={'centerTriangle'}>
                <h1>{triangleTxt}</h1>
                <div className="triangle outline"></div>
                <div className="triangle area"></div>
            </div>,
            <main key={'main'}>
                {this.props.children}
            </main>
        ])
    }
}

export default withRouter(Component);
