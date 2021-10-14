import { render } from "@testing-library/react";
import React, {Component} from "react";
import './App.css'
import CustomerAdd from './customerAdd';
import CustomerEdit from './customerEdit';
import CustomerDelete from './customerDelete';
import Helpit from './helpit';
import iconEdit from './img/edit-48.png';
import iconDelete from './img/delete-48.png';


class CustomerFetch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customers: [],
      recordcount: 0,
      from: 0,
      to: 9,
      userId: "",
      show: "showCustomers",
      showHelp: false, // Näytetäänkö ylipäänsä joku customer aiheinen helppi vai ei
      muokattavaAsiakas: {}, // Tähän asetetaan yksi kokonainen asiakas olio ja siitä voidaan lukea myös id
      poistettavaAsiakas: {} // sama tässä, eli erillistä id ja id2del statea poistettavalle ja muokattavalle ei tarvita
    }
    this.handleChildUnmount = this.handleChildUnmount.bind(this)
    this.handleClickEdit = this.handleClickEdit.bind(this)
    this.handleClickDelete = this.handleClickDelete.bind(this)


    //this.handleChildUnmount = this.handleChildUnmount.bind(this)
  }

  handleChildUnmount() {
    //this.setState({ show: "showCustomers" })
    let message = this.props.location.state.message

    if (message === "showCustomersLink"){
      this.setState({show:"showCustomers"})
    }
    else if (message === "addCustomersLink"){
      this.setState({show:"addCustomers"})
    }
    this.haeTypicodesta()
}

// handleChildUnmount() {
//   this.setState({show: "showCustomers"})
//   this.haeTypicodesta()
// }

handleClickAddForm = () => {
  this.setState({show: 'addCustomers'})
}


handleClickShowCustomers = () => {
  this.setState({show: 'showCustomers'})
}


handleClickEdit = (dataObj) => {
  this.setState({
      show: "editCustomers",
      muokattavaAsiakas: dataObj
  })
  console.log(this.state.muokattavaAsiakas)
}

handleClickDelete = (dataObj) => {
    this.setState({
      show: "deleteCustomers",
      poistettavaAsiakas: dataObj
      
    })  
    console.log(this.state.poistettavaAsiakas)
  }

  näytäHelppiPainettu = () => {
    this.setState({showHelp: !this.state.showHelp}) // ! -operaattori vaihtaa boolean tilan aina toisinpäin true <--> false
    } 


  // * Then syntaksista:
  // .then ottaa aina edellisen rivin valmistuneen "tuotoksen" ja jatkaa sen käsittelyä. Tuotoksen voi itse päättää.
  // Esim: .then(edellisenRivinTuotos => console.log(edellisenRivinTuotos))
  componentDidMount() {

    // fetch(`https://jsonplaceholder.typicode.com/todos?_start='+this.state.start+'&_end='+this.state.end`)
    //     .then(responseServerilta => responseServerilta.json())
    //     .then(jsonConverted => this.setState({typicodeViestit: jsonConverted}))

    let message = this.props.location.state.message

    // if (message === "showCustomersLink"){
    //   this.setState({show:"showCustomers"})
    // }
    // else if (message === "addCustomersLink"){
    //   this.setState({show:"addCustomers"})
    // }
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
          <button className="btn btn-primary" onClick={this.handleClickAddForm}>Add customers</button>

          <h3>Customers</h3>
          {/* <p>{this.state.typicodeViestit[2].title}</p> */}
          <button className="btn btn-primary" onClick={this.handleClickPrev}>Previous</button>
          <button className="btn btn-primary" onClick={this.handleClickNext}>Next</button>
          <div className="row justify-content-center">
              <div className="col-md-6">
                  <hr />
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Contact name</th>
                  <th>Company name</th>
                  <th></th>
             

                </tr>
              </thead>
              <tbody>
                {this.state.customers.map((custRivi) => (
                  <tr key={custRivi.customerId}>
                    <td>{custRivi.customerId}</td>
                    <td>{custRivi.contactName}</td>
                    <td>{custRivi.companyName}</td>                                        
                    <td><button className="btn btn-actions btn-secondary" onClick={() => this.handleClickEdit(custRivi)}><img src={iconEdit} width="20px"/></button>
                    <button className="btn btn-actions btn-warning" onClick={() => this.handleClickDelete(custRivi)}><img src={iconDelete} width="20px"/></button></td>
             
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      );
      
    } 
    if (this.state.show === "addCustomers")
    {

      return (
      <div>
        {/* Kommentti */}
        <button className="btn btn-secondary" onClick={this.handleClickShowCustomers}>Show customers</button>
        <CustomerAdd unmountMe={this.handleChildUnmount} />
      </div>         
      )
    }
    else if (this.state.show === "editCustomers") {
            
      return (<div className="box3">
          <h2>Asiakkaan muokkaus</h2>
          <div>
               {this.state.showHelp === false ? <button className="btn btn-primary" onClick={this.näytäHelppiPainettu}>Show help</button>
              : <button className="btn btn-primary" onClick={this.näytäHelppiPainettu}>Hide help</button>}

              <button className="btn btn-primary" onClick={this.handleChildUnmount}>Browse customers</button>
          </div>

          {this.state.showHelp === true ? <Helpit moduli={"customerEdit"} /> : null}

          <CustomerEdit asiakasObj={this.state.muokattavaAsiakas} unmountMe={this.handleChildUnmount} />

      </div>
      )
  } 
  
  else if (this.state.show === "deleteCustomers") {
    return (<div className="box1">
        <h2>Confirm delete</h2>

        <CustomerDelete asiakasObj={this.state.poistettavaAsiakas} unmountMe={this.handleChildUnmount} />
        <hr />
        {this.state.showHelp === false ? <button className="btn btn-primary" onClick={this.näytäHelppiPainettu}>Show help</button>
            : <button className="btn btn-primary" onClick={this.näytäHelppiPainettu}>Hide help</button>}
            <button className="btn btn-primary" onClick={this.handleChildUnmount}>Back to customers</button>
            {this.state.showHelp === true ? <Helpit moduli={"customerDelete"} /> : null}   

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

