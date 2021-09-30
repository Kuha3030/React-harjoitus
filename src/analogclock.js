import React, {Component} from 'react';
import './App.css';
import AnalogClock from 'analog-clock-react';


class AnaClock extends Component {

    render() {
        let options = {
            width: "300px",
            border: true,
            borderColor: "#2e2e2e",
            baseColor: "#17a2b8",
            centerColor: "#459cff",
            centerBorderColor: "#fff",
            handColors: {
              second: "#d81c7a",
              minute: "#fff",
              hour: "#fff"
            }
        };
        return (
            <>
            <AnalogClock {...options} />


            </>
        );
    }
}
export default AnaClock;

