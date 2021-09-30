import { render } from '@testing-library/react';
import React, {Component} from 'react';
import './App.css';
import DigitalClock from './digitalclock';

class Message extends Component {
    render() {
        return (
            <>
            <p>Default message.</p>
            
            </>
        );
    }
}

class MessageProp extends Component {
    render() {
        return (
            <>                        
                <p>{this.props.message}</p>
                <p>{this.props.kukkaruukku}</p>        
            </>
        );
    }
}

class Messages extends Component {
    render() {
        return (
            <>
                <div className="App">
                    <header className="Messages-header">
                        <h3>Messages application window</h3>
                    </header>
                </div>
                <div>
                    <p>Messages spawn below: </p>
                    <Message />
                    <MessageProp message="Message prop!" kukkaruukku="pelargonia" />
                    <DigitalClock />
                </div>
            </>
        );
    }
}


export default Messages;
