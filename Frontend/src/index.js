import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App2 from './components/hacker';
import App from './components/App';
import CountriesApp from './components/Countries';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App2 /> */}
    {/* <App/> */}
    <CountriesApp/>
  </React.StrictMode>
);

