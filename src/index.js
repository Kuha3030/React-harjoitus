import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Messages from './messages';
import Header from './header';
import Body from './body';
import Footer from './footer';
import AnaClock from './analogclock';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Body />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
