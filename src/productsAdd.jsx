import { render } from "@testing-library/react";
import React, {Component} from "react";
import './App.css'

class ProductsAdd extends Component {
constructor (props) {    
  super(props)
  this.state = {value: ''};
  this.state = {ProductID: '', ProductName: '', SupplierID: '', CategoryID: '', QuantityPerUnit: '', UnitPrice: '',  UnitsInStock: '', UnitsOnOrder: '', ReorderLevel: '', Discontinued: ''  };
  this.handleChangeProductID = this.handleChangeProductID.bind(this);
  this.handleChangeProductName = this.handleChangeProductName.bind(this);
  this.handleChangeSupplierID = this.handleChangeSupplierID.bind(this);
  this.handleChangeCategoryID = this.handleChangeCategoryID.bind(this);
  this.handleChangeQuantityPerUnit = this.handleChangeQuantityPerUnit.bind(this);
  this.handleChangeUnitPrice = this.handleChangeUnitPrice.bind(this);
  this.handleChangeUnitsInStock = this.handleChangeUnitsInStock.bind(this);
  this.handleChangeUnitsOnOrder = this.handleChangeUnitsOnOrder.bind(this);
  this.handleChangeReorderLevel = this.handleChangeReorderLevel.bind(this);
  this.handleChangeDiscontinued = this.handleChangeDiscontinued.bind(this);

  
  

  this.handleSubmit = this.handleSubmit.bind(this);
}

dismiss() {
  this.props.unmountMe()
} 

// Input kenttien onChange tapahtumakäsittelijät
// Event on itse nimettävä parametri. Niin kuin normaalisti funktiossa voi syöttää antamiaan omia arvoja käsiteltäväksi.
handleChangeProductID(event) { 
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

  this.setState({...this.state,ProductID: syöte.toUpperCase()});
}
handleChangeProductName(event) { 
  var syöte = event.target.value;
  this.setState({...this.state,ProductName: syöte});
}  
handleChangeSupplierID(event) {
  var syöte = event.target.value;
  this.setState({...this.state,SupplierID: syöte});
}
handleChangeCategoryID(event) {
  var syöte = event.target.value;
  this.setState({...this.state,CategoryID: syöte});
}
handleChangeQuantityPerUnit(event) {
  var syöte = event.target.value;
  this.setState({...this.state,QuantityPerUnit: syöte});
}
handleChangePhone(event) {
  var syöte = event.target.value;
  this.setState({...this.state,Phone: syöte});
}
handleChangeUnitPrice(event) {
  var syöte = event.target.value;
  this.setState({...this.state,UnitPrice: syöte});
}

handleChangeUnitsInStock(event) {
    var syöte = event.target.value;
    this.setState({...this.state,UnitsInStock: syöte});
  }
handleChangeUnitsOnOrder(event) {
    var syöte = event.target.value;
    this.setState({...this.state,UnitsOnOrder: syöte});
  }
handleChangeReorderLevel(event) {
    var syöte = event.target.value;
    this.setState({...this.state,ReorderLevel: syöte});
  }
  handleChangeDiscontinued(event) {
    var syöte = event.target.value;
    this.setState({...this.state,Discontinued: syöte});
  }

  
  
  

handleSubmit(event) {
  alert('Lähetettiin asiakas: ' + this.state.ProductID);
  event.preventDefault();
  this.InsertoiKantaan();
}

InsertoiKantaan() {
  // Luodaan asiakasobjekti, johon haetaan state:sta tiedot                     
 const asiakas = {
                //  ProductID: this.state.ProductID,
                 ProductName: this.state.ProductName,
                 SupplierID: parseInt(this.state.SupplierID),
                 CategoryID: parseInt(this.state.CategoryID),
                 QuantityPerUnit: this.state.QuantityPerUnit,
                 UnitPrice: this.state.UnitPrice,
                 UnitsInStock: parseInt(this.state.UnitsInStock),
                 UnitsOnOrder:parseInt(this.state.UnitsOnOrder),
                 ReorderLevel: parseInt(this.state.ReorderLevel)
                //  Discontinued: parseBit(this.state.Discontinued)
                };

 // Luodaan asiakasobjektista JSON objekti: 
 const productJson = JSON.stringify(asiakas);
 console.log("asiakasJson = " + productJson);

 // Määritellään APIn post url
 const apiUrl= 'https://localhost:5001/api/Products/';

 // käytetään fetch metodia, jonka tyypiksi on määritelty "POST".
 // Huom! Metodilla voisi olla myös muita määrityksiä (Headereita) kuin Accept ja Content-Type. Esim Cors!
 fetch(apiUrl, {
     method: "POST",
     headers: {
         "Accept": "application/json",
         "Content-Type": "application/json"
     },
     // Määritellään post-metodin body, joka on aiemmin luotu asiakas-objekti JSON muodossa.
     body: productJson
 }) // Tämän jälkeen tieto on jo lähetty API:lle! Alla olevat .thenit ovat pelkkää APIn vastauksen käsittelyä.
 
 .then((response) => response.json())
     .then((json) => {
         // store the data returned from the backend to the current state
         const success = json;
         console.log(`Response from server: ${success}.`);
         if (success) {
            alert("Pyyntö asiakkaan tallettamiseksi tehty");
            // this.props.unmountMe();
          }
     });
}

render() {
  return (

    <div>
      <h3>Add Product</h3>
    <form onSubmit={this.handleSubmit}>        

    {/* <div className="col-3 text-start"> 
    <div>   
      <label for="ProductID" className="form-label">Product ID</label>
      </div>
      <input className="form-control ms-1 mt-n2" type="text" title="Syötä asiakastunnus" placeholder="ProductID" onChange={this.handleChangeProductID} /> 
    </div> */}

    <div className="col-3 text-start">    
        <label for="ProductName" className="form-label">ProductName</label>
        <input id="ProductName" className="form-control ms-1 mt-n2" type="text" title="Syötä firman nimi" placeholder="ProductName" onChange={this.handleChangeProductName} /> 
    </div>

    <div className="col-3 text-start">    
        <label for="SupplierID" className="form-label">SupplierID</label>
        <input id="SupplierID" className="form-control ms-1 mt-n2" type="text" title="Syötä kontaktin nimi" placeholder="SupplierID" onChange={this.handleChangeSupplierID} /> 
    </div>
    <div className="col-3 text-start">    
        <label for="CategoryID" className="form-label">CategoryID</label>
        <input id="CategoryID" className="form-control ms-1 mt-n2" type="text" title="Syötä kontaktin titteli" placeholder="CategoryID" onChange={this.handleChangeCategoryID} /> 
    </div>
    <div className="col-3 text-start">    
        <label for="QuantityPerUnit" className="form-label">QuantityPerUnit</label>
        <input id="QuantityPerUnit" className="form-control ms-1 mt-n2" type="text" title="Syötä osoite" placeholder="QuantityPerUnit" onChange={this.handleChangeQuantityPerUnit} /> 
    </div>
    {/* <div className="col-3 text-start">    
        <label for="Phone" className="form-label">Phone</label>
        <input id="Phone" className="form-control ms-1 mt-n2" type="text" title="Syötä puhelinnumero" placeholder="Phone" onChange={this.handleChangePhone} /> 
    </div> */}
    <div className="col-3 text-start">    
        <label for="UnitPrice" className="form-label">UnitPrice</label>
        <input id="UnitPrice" className="form-control ms-1 mt-n2" type="text" title="Syötä UnitPricein numero" placeholder="UnitPrice" onChange={this.handleChangeUnitPrice} /> 
    </div>
    <div className="col-3 text-start">    
        <label for="UnitsInStock" className="form-label">UnitsInStock</label>
        <input id="UnitsInStock" className="form-control ms-1 mt-n2" type="text" title="Syötä UnitsInStock numero" placeholder="UnitsInStock" onChange={this.handleChangeUnitsInStock} /> 
    </div>
    <div className="col-3 text-start">    
        <label for="UnitsOnOrder" className="form-label">UnitsOnOrder</label>
        <input id="UnitsOnOrder" className="form-control ms-1 mt-n2" type="text" title="Syötä UnitsOnOrder numero" placeholder="UnitsOnOrder" onChange={this.handleChangeUnitsOnOrder} /> 
    </div>
    <div className="col-3 text-start">    
        <label for="ReorderLevel" className="form-label">ReorderLevel</label>
        <input id="ReorderLevel" className="form-control ms-1 mt-n2" type="text" title="Syötä ReorderLevel numero" placeholder="ReorderLevel" onChange={this.handleChangeReorderLevel} /> 
    </div>
    {/* <div className="col-3 text-start">    
        <label for="Discontinued" className="form-label">Discontinued</label>
        <input id="Discontinued" className="form-control ms-1 mt-n2" type="text" title="Syötä Discontinued numero" placeholder="Discontinued" onChange={this.handleChangeDiscontinued} /> 
    </div> */}
    
      <br/>
      <br/>
      <button className="btn btn-success" type="submit">Tallenna uudet tiedot</button> 
    </form>
    </div>
 
     
  );
}
}

export default ProductsAdd