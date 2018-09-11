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
        this.panels = [];
        this.panelCount = Object.keys(navigation).length;
        this.scrollHandler = 'scrollBehavior' in document.documentElement.style ? this.scrollIntoView : this.animateScrolling;
        this.wheelTimeout = null;
        this.scrollTimeout = null;

        this.addEvents();
    }

    addEvents() {
        let prefix = !('onwheel' in document.createElement('div')) ? 'mouse' : '';
        window.addEventListener('scroll', this.onScroll);
        document.addEventListener(`${prefix}wheel`, this.onMouseWheel); //IE9, Chrome, Safari, Opera
    }

    setPanels(){
        let panels = document.getElementsByClassName('pagePanel');
        let panelWrapperRect = document.querySelector('main').getBoundingClientRect();

        this.panels = Array.prototype.map.call(panels, panel => {
            let panelRect = panel.getBoundingClientRect();
            return {
                ...panel,
                key: panel.id.replace('Panel', ''),
                absoluteRectTop: panelRect.top - panelWrapperRect.top
            }
        });

        this.getPanelsInViewport();
    }

    componentDidMount() {
        setTimeout(this.checkLocation, 100, this.props.location.pathname);
        this.setPanels();
    }

    componentWillUpdate(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.checkLocation(nextProps.location.pathname);
        }
    }

    checkLocation = (pathname) => {
        let key = pathname.split('/')[1];
        key = (key && navigation[key]) ? key : Object.keys(navigation)[0];
        this.setActivePanel(key);
    };

    setActivePanel(key) {
        let keyPos = Object.keys(navigation).indexOf(key);
        let panel = document.getElementById(`${key}Panel`);

        if(panel){
            let navigationObj = navigation[key];
            this.setState({activePanelIndex: keyPos});
            this.scrollHandler(keyPos, panel);
            setTimeout(() => {
                this.setState({
                    triangleClassName: key,
                    triangleTxt: navigationObj.label
                });
            }, 200);
        }

    }

    animateScrolling(keyPos, panel) {
        let start = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        let to = (window.innerHeight || document.body.clientHeight) * keyPos;
        let change = to - start;
        let currentTime = 0;
        let increment = 20;
        let duration = 600;

        let animateScroll = () => {
            currentTime += increment;
            document.documentElement.scrollTop = this.easeOutCubic(currentTime, start, change, duration);

            if (currentTime < duration) {
                window.setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
        console.log('animateScrolling');
    }

    scrollIntoView(keyPos, panel) {
        panel.scrollIntoView({block: 'center', behavior: 'smooth'});
    }

    onScroll = () => {
        window.clearTimeout(this.scrollTimeout);
        this.scrollTimeout = window.setTimeout(this.getPanelsInViewport, 200);
    };

    getPanelsInViewport = () => {
        let viewPortStart = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        let windowHeight = window.innerHeight || document.body.clientHeight;
        let viewportEnd = viewPortStart + windowHeight;
        let panelsInViewport = [];

        this.panels.map(panel => {
            let panelRectBottom = panel.absoluteRectTop + windowHeight;
            if (
                (panel.absoluteRectTop > viewPortStart && panel.absoluteRectTop < viewportEnd)
                || (panelRectBottom < viewportEnd && panelRectBottom > viewPortStart)
            ){
                let areaSize = (panel.absoluteRectTop > viewPortStart && panel.absoluteRectTop < viewportEnd) ? (viewportEnd - panel.absoluteRectTop) : (panelRectBottom - viewPortStart);
                panelsInViewport[areaSize] = panel.key;
            }
        });
        let sortedKeys = Object.keys(panelsInViewport).sort((a, b) => (b-a));
        if(sortedKeys[0] && panelsInViewport[sortedKeys[0]]) {
            let key = panelsInViewport[sortedKeys[0]];
            this.props.history.push(this.props.match.url + key);
            this.setActivePanel(key);
        }
    };

    onMouseWheel = (e) => {
        let value = e.wheelDelta || -e.deltaY || -e.detail;
        let direction = Math.max(-1, Math.min(1, value)) * -1;

        window.clearTimeout(this.wheelTimeout);
        this.wheelTimeout = window.setTimeout(() => {
            let index = this.state.activePanelIndex + direction;
            if (index >= 0 && index < this.panelCount) {
                this.props.history.push(this.props.match.url + Object.keys(navigation)[index]);
            }
        }, 300);
        e.preventDefault();
    };

    easeOutCubic(t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    };

    render() {
        let {triangleClassName, triangleTxt} = this.state;
        return ([
            <MainNav key={'mainNav'}/>,
            <div className={`mainTriangle ${triangleClassName}`} key={'centerTriangle'}>
                <span className={'h'}>{triangleTxt}</span>
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
