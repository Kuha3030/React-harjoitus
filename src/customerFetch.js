import { render } from "@testing-library/react";
import React, {Component} from "react";
import './App.css'
import CustomerAdd from './customerAdd';


class CustomerFetch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customers: [],
      recordcount: 0,
      from: 0,
      to: 9,
      userId: "",
      show: "showCustomers"
    }
    this.handleChildUnmount = this.handleChildUnmount.bind(this)
    
  }

handleChildUnmount() {
  this.setState({show: "showCustomers"})
  this.haeTypicodesta()
}

handleClickAddForm = () => {
  this.setState({show: 'addCustomers'})
}

handleClickShowCustomers = () => {
  this.setState({show: 'showCustomers'})
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
    let fromNew = this.state.from;
    let toNew = this.state.to;
    if (fromNew > 0) {
      fromNew = fromNew - 10;
      toNew = toNew - 10;
      this.setState(
        {
          to: toNew,
          from: fromNew,
        },
        this.haeTypicodesta
      );
    }
  };

  handleClickNext = () => {
    let fromNew = this.state.from;
    let toNew = this.state.to;
    if (toNew < 90) {
      fromNew = fromNew + 10;
      toNew = toNew + 10;
      this.setState(
        {
          to: toNew,
          from: fromNew,
          page: this.state.page + 1,
        },
        this.haeTypicodesta
      );
    }
  };

  haeTypicodesta() {
    //let uri = 'https://jsonplaceholder.typicode.com/todos'; //haku ilman rajoituksia
    //let uri='https://jsonplaceholder.typicode.com/todos?_page='+this.state.page+'&_limit='+this.state.limit
    let uri =
      "https://localhost:5001/api/customers/from/" +
      this.state.from +
      "/to/" +
      this.state.to;

    fetch(uri)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ customers: json, recordcount: json.length });
      });
  }

  render() {

    if (this.state.show === "showCustomers") 
    {
      console.log("State on: ", this.state.customers);
      return (
        <div>
          <button className="btn btn-secondary" onClick={this.handleClickAddForm}>Add customers</button>

          <h3>Customers: </h3>
          {/* <p>{this.state.typicodeViestit[2].title}</p> */}
          <button className="btn btn-secondary" onClick={this.handleClickPrev}>Previous</button>
          <button className="btn btn-secondary" onClick={this.handleClickNext}>Next</button>
          <div className="row justify-content-center">
              <div className="col-md-6">
                  <hr />
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Contact name</th>
                  <th>Company name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.customers.map((custRivi) => (
                  <tr key={custRivi.customerId}>
                    <td>{custRivi.customerId}</td>
                    <td>{custRivi.contactName}</td>
                    <td>{custRivi.companyName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      );
    } 
    else if (this.state.show === "addCustomers")
    {
      return (
      <div>
        <button className="btn btn-secondary" onClick={this.handleClickShowCustomers}>Show customers</button>
        <CustomerAdd unmountMe={this.handleChildUnmount}/>
      </div>
      )
    }
    else {
      return (
        <div>
          <h3>Loading customers</h3>
        </div>
      );
    }
  }
}

export default CustomerFetch

