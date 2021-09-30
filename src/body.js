import React, {Component} from 'react';
import './App.css';
import CustomerFetch from './customerFetch';
import DigitalClock from './digitalclock';
import LoginsFetch from './loginsFetch';
import TypicodeFetch from './typicodeFetch';

class Body extends Component {
    render() {
        return (
            <>
                <div className="App-body">
                    {/* <TypicodeFetch /> */}
                    <p>-</p>
                    <CustomerFetch />
                    {/* <LoginsFetch /> */}
                    {/* <DigitalClock /> */}
                    
                </div>

            </>
        );
    }
}
export default Body;