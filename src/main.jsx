import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from "react-redux";
import {store} from "./app/store"
import { BrowserRouter } from 'react-router-dom';
import { Toolbar } from '@mui/material';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toolbar />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
