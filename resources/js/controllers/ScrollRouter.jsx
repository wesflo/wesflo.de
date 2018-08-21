import React from "react";
import {withRouter} from "react-router-dom";
import navigation from "../config/navigation";

class tmp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            containerMarginTop: 0,
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
                let panel = document.getElementById(`${target}Panel`);
                window.scrollTo(0, window.innerHeight * keyPos);
                let containerMarginTop = `-${keyPos * 100}vh`;
                this.setState({containerMarginTop});
            }
        }
    }

    render() {
        let {containerMarginTop} = this.state;
        return (
            <main>
                <div className={'scrollWrapper'} style={{marginTop: containerMarginTop}}>
                    {this.props.children}
                </div>
            </main>
        )
    }
}

export default withRouter(tmp);
