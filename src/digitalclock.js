import React, {Component} from 'react';
import './App.css';
import Clock from 'react-clock';
import AnalogClock from 'analog-clock-react';

class ClockForTime extends Component {
render () {
    return (
        <h4>Kello on nyt: {this.props.timeoftheday}</h4>
    )
}
}

class DigitalClock extends Component {
    constructor(props){
        super(props);
        this.state = {
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            pvm: new Date()
        };
    }
    componentDidMount() 
    {
        this.intervalID= setInterval(
            () => this.tick(),
            1000
        );
    }

    tick() {
        this.setState({ 
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            pvm: new Date()

        });
    }


    componentWillUnmount()
    {
        clearInterval(this.intervalID);
    }
    render() {

        let options = {
            width: "550px",
            border: true,
            borderColor: "#2e2e2e",
            baseColor: "grey",
            centerColor: "gold",
            centerBorderColor: "#2e2e2e",
            handColors: {
              second: "gold",
              minute: "#33FFD8",
              hour: "#33FFD8"
            }
        };
        return (
            <>
                <div className="digiclock" align="center">
                    <br />
                    <AnalogClock {...options} />                   
                </div>

            </>
        );
    }
}



export default DigitalClock;