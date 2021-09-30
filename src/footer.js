import React, {Component} from 'react';
import './App.css';
import DigitalClock from './digitalclock';
import MD5demo from './MD5-encryption';

class Footer extends Component {
    render() {
        return (
            <>
                <hr />

                <div className="App-footer">
                    (c) Petri Kuha, 2021
                <MD5demo />
                </div>

            </>
        );
    }
}
export default Footer;