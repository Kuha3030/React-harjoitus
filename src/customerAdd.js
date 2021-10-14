import { render } from "@testing-library/react";
import React, {Component} from "react";
import './App.css'

class CustomerAdd extends Component {
constructor (props) {
  super(props)
  this.state = {value: ''};
  this.state = {CustomerID: '', CompanyName: '', ContactName: '', ContactTitle: '', Address: '', Phone: '', Fax: '' };
  this.handleChangeCustomerID = this.handleChangeCustomerID.bind(this);
  this.handleChangeCompanyName = this.handleChangeCompanyName.bind(this);
  this.handleChangeContactName = this.handleChangeContactName.bind(this);
  this.handleChangeContactTitle = this.handleChangeContactTitle.bind(this);
  this.handleChangeAddress = this.handleChangeAddress.bind(this);
  this.handleChangePhone = this.handleChangePhone.bind(this);
  this.handleChangeFax = this.handleChangeFax.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

dismiss() {
  this.props.unmountMe()
} 

// Input kenttien onChange tapahtumakäsittelijät
// Event on itse nimettävä parametri. Niin kuin normaalisti funktiossa voi syöttää antamiaan omia arvoja käsiteltäväksi.
handleChangeCustomerID(event) { 
  var syöte = event.target.value;

  // ### SPREAD SYNTAKSI:
  // (...this.state) tarkoittaa, että state avataan auki ja sinne tehdään pilkun (,) jälkeiset muutokset.
  // ESIM:

  // this state = {
  // rotu: 'pystyKorva',
  // paino: '15'
  // }
  // 
  // this.setState({...this.state, rotu: kultainenNoutaja })

  this.setState({...this.state,CustomerID: syöte.toUpperCase()});
}
handleChangeCompanyName(event) { 
  var syöte = event.target.value;
  this.setState({...this.state,CompanyName: syöte});
}  
handleChangeContactName(event) {
  var syöte = event.target.value;
  this.setState({...this.state,ContactName: syöte});
}
handleChangeContactTitle(event) {
  var syöte = event.target.value;
  this.setState({...this.state,ContactTitle: syöte});
}
handleChangeAddress(event) {
  var syöte = event.target.value;
  this.setState({...this.state,Address: syöte});
}
handleChangePhone(event) {
  var syöte = event.target.value;
  this.setState({...this.state,Phone: syöte});
}
handleChangeFax(event) {
  var syöte = event.target.value;
  this.setState({...this.state,Fax: syöte});
}

handleSubmit(event) {
  alert('Lähetettiin asiakas: ' + this.state.CustomerID);
  event.preventDefault();
  this.InsertoiKantaan();
}

InsertoiKantaan() {
  // Luodaan asiakasobjekti, johon haetaan state:sta tiedot                     
 const asiakas = {CustomerID: this.state.CustomerID,
                 CompanyName: this.state.CompanyName,
                 ContactName: this.state.ContactName,
                 ContactTitle: this.state.ContactTitle,
                 Address: this.state.Address,
                 Phone: this.state.Phone,
                 Fax: this.state.Fax};
                 
 // Luodaan asiakasobjektista JSON objekti: 
 const asiakasJson = JSON.stringify(asiakas);
 console.log("asiakasJson = " + asiakasJson);

 // Määritellään APIn post url
 const apiUrl= 'https://localhost:5001/api/customers/';

 // käytetään fetch metodia, jonka tyypiksi on määritelty "POST".
 // Huom! Metodilla voisi olla myös muita määrityksiä (Headereita) kuin Accept ja Content-Type. Esim Cors!
 fetch(apiUrl, {
     method: "POST",
     headers: {
         "Accept": "application/json",
         "Content-Type": "application/json"
     },
     // Määritellään post-metodin body, joka on aiemmin luotu asiakas-objekti JSON muodossa.
     body: asiakasJson
 }) // Tämän jälkeen tieto on jo lähetty API:lle! Alla olevat .thenit ovat pelkkää APIn vastauksen käsittelyä.
 .then((response) => response.json())
     .then((json) => {
         // store the data returned from the backend to the current state
         const success = json;
         console.log(`Response from server: ${success}.`);
         if (success) {
            alert("Pyyntö asiakkaan tallettamiseksi tehty");
            this.props.unmountMe();
          }
     });
}

render() {
  return (

    <div>
      <h3>Add customer</h3>
    <form onSubmit={this.handleSubmit}>        

    <div className="col-3 text-start"> 
    <div>   
      <label for="CustomerID" className="form-label">Customer ID</label>
      </div>
      <input className="form-control ms-1 mt-n2" type="text" title="Syötä asiakastunnus" placeholder="CustomerID" onChange={this.handleChangeCustomerID} /> 
    </div>

    <div className="col-3 text-start">    
        <label for="CompanyName" className="form-label">Company Name</label>
        <input id="CompanyName" className="form-control ms-1 mt-n2" type="text" title="Syötä firman nimi" placeholder="CompanyName" onChange={this.handleChangeCompanyName} /> 
    </div>

    <div className="col-3 text-start">    
        <label for="ContactName" className="form-label">Contact Name</label>
        <input id="ContactName" className="form-control ms-1 mt-n2" type="text" title="Syötä kontaktin nimi" placeholder="ContactName" onChange={this.handleChangeContactName} /> 
    </div>
    <div className="col-3 text-start">    
        <label for="ContactTitle" className="form-label">Contact Title</label>
        <input id="ContactTitle" className="form-control ms-1 mt-n2" type="text" title="Syötä kontaktin titteli" placeholder="ContactTitle" onChange={this.handleChangeContactTitle} /> 
    </div>
    <div className="col-3 text-start">    
        <label for="Address" className="form-label">Address</label>
        <input id="Address" className="form-control ms-1 mt-n2" type="text" title="Syötä osoite" placeholder="Address" onChange={this.handleChangeAddress} /> 
    </div>
    <div className="col-3 text-start">    
        <label for="Phone" className="form-label">Phone</label>
        <input id="Phone" className="form-control ms-1 mt-n2" type="text" title="Syötä puhelinnumero" placeholder="Phone" onChange={this.handleChangePhone} /> 
    </div>
    <div className="col-3 text-start">    
        <label for="Fax" className="form-label">Fax</label>
        <input id="Fax" className="form-control ms-1 mt-n2" type="text" title="Syötä faxin numero" placeholder="Fax" onChange={this.handleChangeFax} /> 
    </div>


      <br/>
      <br/>
      <button className="btn btn-success" type="submit">Tallenna uudet tiedot</button> 
    </form>
    </div>
 
     
  );
}
}

export default CustomerAdd