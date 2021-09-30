import React, {Component} from 'react';
import './App.css';
import MD5 from 'md5';

class MD5demo extends Component {
render() {

    let toBeEncrypted = "passu123";
    let encrypted = MD5(toBeEncrypted);
    return (
        <div>
            <p>salaamaton: {toBeEncrypted}</p>
            <p>salattu: {encrypted}</p>
        </div>
    )
}

}

export default MD5demo;
