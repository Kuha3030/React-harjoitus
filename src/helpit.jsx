import React, { Component } from "react"
import './App.css'

class Helpit extends Component {
    render() {
        if (this.props.moduli === "viestit") {
            return (<div className="helppi">
                <h4>Helppi</h4>
                <p>Viestit toiminto välittää käyttäjälle viestejä.</p>
            </div>
            )
        }
        if (this.props.moduli === "kello") {
            return (<div className="helppi">
                <h4>Clock</h4>
                <p>Shows current time</p>
            </div>
            )
        }

        if (this.props.moduli === "customerFetch") {
            return (<div className="helppi">
                <h4>Fetch</h4>
                <p>Fetch customer information from database in table form.</p>
            </div>
            )
        }

        if (this.props.moduli === "customerAdd") {
            return (<div className="helppi">
                <h4>Add customer</h4>
                <p>Insert information and add customer to database</p>
                <p>Customer ID must be exactly 5 letters long. For example: "ABCDE"</p>
            </div>
            )
        }

        if (this.props.moduli === "customerDelete") {
            return (<div className="helppi">
                <h4>Delete</h4>
                <p>This function erases current customer from database.</p>
                <p>OBS! Customers with invoices cannot be deleted.</p>
            </div>
            )
        }

        if (this.props.moduli === "customerEdit") {
            return (<div className="helppi">
                <h4>Edit</h4>
                <p>This feature allows you to edit and save customer information to database.</p>
                <p>Customer ID cannot be edited after it has been declared.</p>
            </div>
            )
        }
    }
}

export default Helpit