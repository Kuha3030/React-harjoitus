import React, { Component } from 'react'
import './App.css'

class CustomerDelete extends Component {
    constructor(props) {
        super(props)
        this.handlePerformDelete = this.handlePerformDelete.bind(this)
    }

    handleSubmit(event) {
        alert('Poistettava tuote: ' + this.props.tuoteObj.productId)
        event.preventDefault()
        this.InsertoiKantaan()
    }

    callBackRoutine() {
        console.log('Logins callback ', this.props.tuoteObj.productId);
    }

    handlePerformDelete(event) {
        event.preventDefault()
        this.NWDeleteRestApista()
    }

    ResetDeleteDone() {
        this.handleClickTable()
        this.HaeNWRestApista()
    }

    NWDeleteRestApista() {

        let apiUrl = 'https://localhost:5001/api/customers/delete/' + this.props.asiakasObj.customerId
        console.log(apiUrl)

        fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: null
        }).then((res) => res.json()) // Json responce muutetaan javascriptiksi nimelle vastaus
            .then((vastaus) => {
                console.log('Response from server: ', vastaus);
                if (vastaus) {
                    this.props.unmountMe()
                }
            })
    }
    render() {
        console.log(this.props.asiakasObj)
        return (
            <form className="box4" key={this.props.asiakasObj.CustomerID} onSubmit={this.handlePerformDelete}>
                               
                 <div className="row justify-content-center">
                 <p className="text-center">Customer to be deleted</p>

                    <div className="col-md-3">

            <table className="table table-striped table-dark">

                    <tbody >
                        <tr><td className="otsikko">Customer ID:</td><td>{this.props.asiakasObj.customerId}</td></tr>
                        <tr><td className="otsikko">Company name:</td><td>{this.props.asiakasObj.companyName}</td></tr>
                        <tr><td className="otsikko">Country:</td><td>{this.props.asiakasObj.country}</td></tr>
                    </tbody>
                </table>

                <button className="btn btn-warning" type="submit">Delete this customer</button>
                </div>
                </div>
            </form>
        )
    }
}
export default CustomerDelete