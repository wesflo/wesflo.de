import React from "react";
import ReactDOM from 'react-dom';
import "../scss/app.scss";
import { AppContainer } from 'react-hot-loader';
import App from './App';

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <App />
        </AppContainer>,
        document.getElementById('app')
    );
};

render();

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./App', () => {
        render(App);
        render(require('./App'))
    });
}
