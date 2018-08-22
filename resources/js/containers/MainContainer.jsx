import React from "react";
import {withRouter} from "react-router-dom";
import navigation from "../config/navigation";

class Component extends React.Component {
    constructor(props) {
        super(props);
        let {home} = navigation;
        this.state = {
            containerMarginTop: 0,
            triangleClassName:'home',
            triangleTxt: '',
        }
    }

    componentDidMount(){
        this.appContainer = document.getElementById('app');
        this.appContainer.style.height = (Object.keys(navigation).length * 100) + 'vh';
    }

    componentWillUpdate(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            let target = nextProps.location.pathname.split('/')[1];
            let keyPos = Object.keys(navigation).indexOf(target);

            if (target && keyPos !== -1) {
                let navigationObj = navigation[target];
                let panel = document.getElementById(`${target}Panel`);
                window.scrollTo(0, window.innerHeight * keyPos);
                let containerMarginTop = `-${keyPos * 100}vh`;

                this.setState({containerMarginTop});

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
        let {containerMarginTop, triangleClassName, triangleTxt} = this.state;
        return ([
            <div className={`mainTriangle ${triangleClassName}`} key={'centerTriangle'}>
                <h1>{triangleTxt}</h1>
                <div className="triangle outline"> </div>
                <div className="triangle stripes"> </div>
            </div>,
            <main key={'main'}>
                <div className={'scrollWrapper'} style={{marginTop: containerMarginTop}}>
                    {this.props.children}
                </div>
            </main>
        ])
    }
}

export default withRouter(Component);
