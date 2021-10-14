import { render } from "@testing-library/react";
import React, {Component} from "react";
import './App.css'

class LoginAdd extends Component {
constructor (props) {
  super(props)
  this.state = {value: ''};
  this.state = {Firstname: '', Lastname: '', Email: '', Username: '', Password: '', AccesslevelId: '' };
  this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
  this.handleChangeLastname = this.handleChangeLastname.bind(this);
  this.handleChangeEmail = this.handleChangeEmail.bind(this);
  this.handleChangeUsername = this.handleChangeUsername.bind(this);
  this.handleChangePassword = this.handleChangePassword.bind(this);
  this.handleChangeAccesslevelId = this.handleChangeAccesslevelId.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

dismiss() {
  this.props.unmountMe()
} 

// Input kenttien onChange tapahtumakäsittelijät
// Event on itse nimettävä parametri. Niin kuin normaalisti funktiossa voi syöttää antamiaan omia arvoja käsiteltäväksi.
handleChangeLoginID(event) { 
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

  this.setState({...this.state,LoginID: syöte.toUpperCase()});
}
handleChangeFirstname(event) { 
  var syöte = event.target.value;
  this.setState({...this.state,Firstname: syöte});
}  
handleChangeLastname(event) {
  var syöte = event.target.value;
  this.setState({...this.state,Lastname: syöte});
}
handleChangeEmail(event) {
  var syöte = event.target.value;
  this.setState({...this.state,Email: syöte});
}
handleChangeUsername(event) {
  var syöte = event.target.value;
  this.setState({...this.state,Username: syöte});
}
handleChangePassword(event) {
  var syöte = event.target.value;
  this.setState({...this.state,Password: syöte});
}
handleChangeAccesslevelId(event) {
  var syöte = event.target.value;
  this.setState({...this.state,AccesslevelId: syöte});
}

handleSubmit(event) {
  alert('Lähetettiin login: ' + this.state.Username);
  event.preventDefault();
  this.InsertoiKantaan();
}

InsertoiKantaan() {
  // Luodaan loginobjekti, johon haetaan state:sta tiedot                     
const loginObject = {
                 Firstname: this.state.Firstname,
                 Lastname: this.state.Lastname,
                 Email: this.state.Email,
                 Username: this.state.Username,
                 Password: this.state.Password,
                 AccesslevelId: parseInt(this.state.AccesslevelId)
                };

                 
 // Luodaan loginobjektista JSON objekti: 
const loginJson = JSON.stringify(loginObject);
console.log(loginJson);
 // Määritellään APIn post url
const apiUrl= 'https://localhost:5001/api/logins/';

 // käytetään fetch metodia, jonka tyypiksi on määritelty "POST".
 // Huom! Metodilla voisi olla myös muita määrityksiä (Headereita) kuin Accept ja Content-Type. Esim Cors!
 fetch(apiUrl, {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
     },
     // Määritellään post-metodin body, joka on aiemmin luotu login-objekti JSON muodossa.
     body: loginJson
 }) // Tämän jälkeen tieto on jo lähetty API:lle! Alla olevat .thenit ovat pelkkää APIn vastauksen käsittelyä.
 
 .then((response) => response.json())
     .then((json) => {
         // store the data returned from the backend to the current state
         const success = json;
         console.log(`Response from server: ${success}.`);
         if (success) {
            alert("Pyyntö loginin tallettamiseksi tehty");
            this.props.unmountMe();
          }
     });
}

render() {
  return (

    <div>
    <form onSubmit={this.handleSubmit}>        

    {/* <div className="col-3 text-start"> 
    <div>   
      <label for="LoginID" className="form-label">Customer ID</label>
      </div>
      <input className="form-control ms-1 mt-n2" type="text" title="Syötä logintunnus" placeholder="LoginID" onChange={this.handleChangeLoginID} /> 
    </div> */}

    <div className="col-3 text-start">    
        <label for="Firstname" className="form-label">Firstname</label>
        <input id="Firstname" className="form-control ms-1 mt-n2" type="text" title="Syötä firman nimi" placeholder="Firstname" onChange={this.handleChangeFirstname} /> 
    </div>

    <div className="col-3 text-start">    
        <label for="Lastname" className="form-label">Lastname</label>
        <input id="Lastname" className="form-control ms-1 mt-n2" type="text" title="Syötä kontaktin nimi" placeholder="Lastname" onChange={this.handleChangeLastname} /> 
    </div>
    <div className="col-3 text-start">    
        <label for="Email" className="form-label">Email</label>
        <input id="Email" className="form-control ms-1 mt-n2" type="text" title="Syötä kontaktin titteli" placeholder="Email" onChange={this.handleChangeEmail} /> 
    </div>
    <div className="col-3 text-start">    
        <label for="Username" className="form-label">Username</label>
        <input id="Username" className="form-control ms-1 mt-n2" type="text" title="Syötä osoite" placeholder="Username" onChange={this.handleChangeUsername} /> 
    </div>
    <div className="col-3 text-start">    
        <label for="Password" className="form-label">Password</label>
        <input id="Password" className="form-control ms-1 mt-n2" type="text" title="Syötä puhelinnumero" placeholder="Password" onChange={this.handleChangePassword} /> 
    </div>
    <div className="col-3 text-start">    
        <label for="AccesslevelId" className="form-label">AccesslevelId</label>
        <input id="AccesslevelId" className="form-control ms-1 mt-n2" type="text" title="Syötä AccesslevelIdin numero" placeholder="AccesslevelId" onChange={this.handleChangeAccesslevelId} /> 
    </div>


      <br/>
      <br/>
      <button className="btn btn-success" type="submit">Tallenna uudet tiedot</button> 
    </form>
    </div>
 
     
  );
}
}

export default LoginAdd