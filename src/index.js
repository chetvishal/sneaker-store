import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { DataContextProvider } from './context/dataContextProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './context/authContext';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <DataContextProvider>
          <App />
        </DataContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
