import React, {Component} from 'react';
import './App.css';
import logo from './logo.svg';

class Header extends Component {
    render() {
        return (
            <>
                <div className="App-header"><h2 align="center"><img src={logo} className="App-logo" alt="logo" />REACT<img src={logo} className="App-logo" alt="logo" /></h2>
                </div>

                <hr />
            </>
        );
    }
}
export default Header;