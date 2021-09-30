import { render } from "@testing-library/react";
import React, {Component} from "react";
import './App.css'

class TypicodeFetch extends Component {    

    constructor(props) {
        super(props);
        this.state = {
            typicodeViestit: [],
            recordcount: 0,
            start: 0,
            end: 10,
            page: 1, 
            limit: 10, 
            userId: ""    
        };

    }

    // * Then syntaksista: 
    // .then ottaa aina edellisen rivin valmistuneen "tuotoksen" ja jatkaa sen käsittelyä. Tuotoksen voi itse päättää. 
    // Esim: .then(edellisenRivinTuotos => console.log(edellisenRivinTuotos))
    componentDidMount() {
        // fetch(`https://jsonplaceholder.typicode.com/todos?_start='+this.state.start+'&_end='+this.state.end`)
        //     .then(responseServerilta => responseServerilta.json())
        //     .then(jsonConverted => this.setState({typicodeViestit: jsonConverted}))
        this.haeTypicodesta();
    }

    handleClickPrev = () => {
        let pagenumber = this.state.page;
        if (pagenumber > 0) {
            pagenumber = pagenumber-1;
        }
        this.setState({
            page: pagenumber,
        },this.haeTypicodesta);
    }

    handleClickNext = () => {
        this.setState({
            page: this.state.page+1,
        },this.haeTypicodesta);
    }

    haeTypicodesta() {
        //let uri = 'https://jsonplaceholder.typicode.com/todos'; //haku ilman rajoituksia
        let uri='https://jsonplaceholder.typicode.com/todos?_page='+this.state.page+'&_limit='+this.state.limit
        
        fetch(uri)
            .then(response => response.json())
            .then(json => {
                this.setState({typicodeViestit: json, recordcount: json.length});
            });
    }

    render()
    {

        console.log("State on: ", this.state.typicodeViestit)
        if(1 > 0)
        {
        return(
            <div>
                <h3>Todos from typicode: </h3>
                {/* <p>{this.state.typicodeViestit[2].title}</p> */}
                <button class="btn btn-secondary" onClick={this.handleClickPrev}>Previous</button>
                <button class="btn btn-secondary" onClick={this.handleClickNext}>Next</button>
                <table class="table table-striped table-dark">
                    <thead>
                        <tr>
                        <th>id</th>
                        <th>title</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.typicodeViestit.map(todoRivi => (
                        <tr key={todoRivi.id}>
                        <td>{todoRivi.id}</td>
                        <td>{todoRivi.title}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
        }
        else 
        {
            return(
                <div>
                    <h3>Loading messages from Typicode</h3>    
                </div>
            )
        }
    }

}

export default TypicodeFetch