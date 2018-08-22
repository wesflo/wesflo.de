import React from "react";
import {withRouter} from "react-router-dom";
import navigation from "../config/navigation";
import MainNav from "./MainNav";

class Component extends React.Component {
    constructor(props) {
        super(props);
        let {home} = navigation;
        this.state = {
            containerMarginTop: 0,
            triangleClassName:'home',
            triangleTxt: home.label,
        }
    }

    componentDidMount(){
        this.appContainer = document.getElementById('app');
    }

    componentWillUpdate(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            let target = nextProps.location.pathname.split('/')[1];
            let keyPos = Object.keys(navigation).indexOf(target);

            if (target && keyPos !== -1) {
                let navigationObj = navigation[target];
                let panel = document.getElementById(`${target}Panel`);
                window.scrollTo(0, window.innerHeight * keyPos);

                setTimeout(()=>{
                    this.setState({
                        triangleClassName: target,
                        triangleTxt: navigationObj.label
                    });
                }, 200)
            }
        }
    }

    render() {
        let {triangleClassName, triangleTxt} = this.state;
        return ([
            <MainNav key={'mainNav'} />,
            <div className={`mainTriangle ${triangleClassName}`} key={'centerTriangle'}>
                <h1>{triangleTxt}</h1>
                <div className="triangle outline"> </div>
                <div className="triangle area"> </div>
            </div>,
            <main key={'main'}>
                {this.props.children}
            </main>
        ])
    }
}

export default withRouter(Component);
