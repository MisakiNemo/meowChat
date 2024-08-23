import React from "react";
import App from './App.tsx'
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom'
import './index.scss'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
