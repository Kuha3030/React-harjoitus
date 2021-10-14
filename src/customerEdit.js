 
import React, { Component } from 'react'
import './App.css'

class CustomerEdit extends Component {
    constructor(props) {
        super(props)
        this.state = { asiakasObj: {}, CustomerID: '', CompanyName: '',
         ContactName: '', ContactTitle: '', Address: '', PostalCode: '', City: '',
         Country: '', Phone: '', Fax: '0' }

        this.handleChangeCustomerID = this.handleChangeCustomerID.bind(this)
        this.handleChangeCompanyName = this.handleChangeCompanyName.bind(this)
        this.handleChangeContactName = this.handleChangeContactName.bind(this)
        this.handleChangeContactTitle = this.handleChangeContactTitle.bind(this)
        this.handleChangeAddress = this.handleChangeAddress.bind(this)
        this.handleChangePostalCode = this.handleChangePostalCode.bind(this)
        this.handleChangeCity = this.handleChangeCity.bind(this)
        this.handleChangeCountry = this.handleChangeCountry.bind(this)
        this.handleChangePhone = this.handleChangePhone.bind(this)
        this.handleChangeFax = this.handleChangeFax.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleChangeCustomerID(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, CustomerID: syöte.toUpperCase() })
    }
    handleChangeCompanyName(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, CompanyName: syöte })
    }
    handleChangeContactName(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, ContactName: syöte })
    }
    handleChangeContactTitle(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, ContactTitle: syöte })
    }
    handleChangeAddress(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, Address: syöte })
    }

    handleChangePostalCode(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, PostalCode: syöte })
    }
    handleChangeCity(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, City: syöte })
    }

    handleChangeCountry(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, Country: syöte })
    }
    handleChangePhone(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, Phone: syöte })
    }
    handleChangeFax(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, Fax: syöte })
    }

    handleSubmit(event) {
        alert('Päivitettävä asiakas: ' + this.state.CustomerID)
        event.preventDefault()
        this.InsertoiKantaan()
    }

    callBackRoutine() {
        console.log('NWCustomerEDIT:  callBackRoutine >>-' + this.state.asiakasObj.CustomerID);
    }

    componentDidMount() {
        this.setState({
            CustomerID: this.props.asiakasObj.customerId,
            CompanyName: this.props.asiakasObj.companyName,
            ContactName: this.props.asiakasObj.contactName,
            ContactTitle: this.props.asiakasObj.contactTitle,
            Address: this.props.asiakasObj.address,
            PostalCode: this.props.asiakasObj.postalCode,
            Phone: this.props.asiakasObj.phone,
            Fax: this.props.asiakasObj.fax
        }
        )
        //Tutkitaan onko arvo null --> jos ei, niin viedään se stateen
        if (this.props.asiakasObj.city) { this.setState({ City: this.props.asiakasObj.city }) }
        if (this.props.asiakasObj.country) {
            this.setState({ Country: this.props.asiakasObj.country })
        }
    }

    InsertoiKantaan() {
        // Luodaan asiakasobjekti, johon haetaan state:sta inputkentiltä tulleet tiedot                     
        const asiakas = {
            CustomerID: this.state.CustomerID,
            CompanyName: this.state.CompanyName,
            ContactName: this.state.ContactName,
            ContactTitle: this.state.ContactTitle,
            Address: this.state.Address,
            PostalCode: this.state.PostalCode,
            City: this.state.City,
            Country: this.state.Country,
            Phone: this.state.Phone,
            Fax: this.state.Fax
        }
       
        const asiakasJson = JSON.stringify(asiakas)
        console.log("asiakasJson = ", asiakasJson)

        let apiUrl = 'https://localhost:5001/api/customers/' + this.state.CustomerID
        console.log(apiUrl)

        fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: asiakasJson
        }).then((res) => res.json()) // Vastaus muutetaan javascriptiksi jsonista
            .then((vastaus) => {
                console.log(`Response from server: ${vastaus}.`)
                if (vastaus) {
                    this.props.unmountMe()
                }
            })
    }

    render() {
        return (

          
                   <form onSubmit={this.handleSubmit}>
                    <div className="col-3 text-start">    
                        <label for="CompanyName" className="form-label">Company Name</label>
                        <input id="CompanyName" value={this.state.CompanyName} className="form-control ms-1 mt-n2" type="text" title="Syötä firman nimi" placeholder="CompanyName" onChange={this.handleChangeCompanyName} /> 
                    </div>
                    <div className="col-3 text-start">    
                        <label for="ContactName" className="form-label">Contact Name</label>
                       <input id="ContactName" value={this.state.ContactName} className="form-control ms-1 mt-n2" type="text" title="Syötä firman nimi" placeholder="CompanyName" onChange={this.handleChangeCompanyName} /> 
                    </div>
                    <div className="col-3 text-start">    
                        <label for="ContactTitle" className="form-label">Contact Title</label>
                        <input id="ContactTitle" value={this.state.ContactTitle} className="form-control ms-1 mt-n2" type="text" title="Syötä firman nimi" placeholder="ContactTitle" onChange={this.handleChangeCompanyName} /> 
                    </div>
                    <div className="col-3 text-start">    
                       <label for="Address" className="form-label">Address</label>
                       <input id="Address" value={this.state.Address} className="form-control ms-1 mt-n2" type="text" title="Syötä firman nimi" placeholder="Address" onChange={this.handleChangeCompanyName} /> 
                    </div>
                    <div className="col-3 text-start">    
                        <label for="PostalCode" className="form-label">Postal Code</label>
                        <input id="PostalCode" value={this.state.PostalCode} className="form-control ms-1 mt-n2" type="text" title="Syötä firman nimi" placeholder="PostalCode" onChange={this.handleChangeCompanyName} /> 
                    </div>
                    <div className="col-3 text-start">    
                        <label for="City" className="form-label">City</label>
                        <input id="City" value={this.state.City} className="form-control ms-1 mt-n2" type="text" title="Syötä firman nimi" placeholder="City" onChange={this.handleChangeCompanyName} /> 
                    </div>
                    <div className="col-3 text-start">    
                        <label for="Country" className="form-label">Country</label>
                    <input id="Country" value={this.state.Country} className="form-control ms-1 mt-n2" type="text" title="Syötä firman nimi" placeholder="Country" onChange={this.handleChangeCompanyName} /> 
                    </div>
                    <div className="col-3 text-start">    
                    <label for="Phone" className="form-label">Phone</label>
                    <input id="Phone" value={this.state.Phone} className="form-control ms-1 mt-n2" type="text" title="Syötä firman nimi" placeholder="Phone" onChange={this.handleChangeCompanyName} /> 
                    </div>
                    <div className="col-3 text-start">    
                    <label for="Fax" className="form-label">Fax</label>
                    <input id="Fax" value={this.state.Fax} className="form-control ms-1 mt-n2" type="text" title="Syötä firman nimi" placeholder="Fax" onChange={this.handleChangeCompanyName} /> 
                    </div>
                <button type="submit" className="btn btn-primary">Save changes</button>


            </form>
         
        )
    }
}
export default CustomerEdit
