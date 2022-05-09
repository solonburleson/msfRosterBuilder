import React from 'react';
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import App from './App/App.jsx';
import store from './redux/store';

const configStore = store();

const container = document.getElementById('root');
const root = createRoot(container);

const index = () => {
    return (
        <Provider store={configStore}>
            <App />
        </Provider>
    )
}

root.render(index());