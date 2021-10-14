import { render } from "@testing-library/react";
import React, {Component} from "react";
import './App.css'
import LoginAdd from "./loginAdd";

class LoginsFetch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logins: [],
      show: "showLogins"
    };
    this.handleChildUnmount = this.handleChildUnmount.bind(this);
  }

  handleChildUnmount() {
    this.setState({ show: "showLogins" });
    this.haeTypicodesta();
  }

  handleClickAddForm = () => {
    this.setState({show: 'addLogins'})
  }

  handleClickShowLogins = () => {
    this.setState({show: 'showLogins'})
  }

  // * Then syntaksista:
  // .then ottaa aina edellisen rivin valmistuneen "tuotoksen" ja jatkaa sen käsittelyä. Tuotoksen voi itse päättää.
  // Esim: .then(edellisenRivinTuotos => console.log(edellisenRivinTuotos))
  componentDidMount() {
    fetch(`https://localhost:5001/api/logins`)
      .then((responseServerilta) => responseServerilta.json())
      .then((jsonConverted) => this.setState({ logins: jsonConverted }));
  }

  render() {
    if (this.state.show === "showLogins") {
      console.log("State on: ", this.state.logins);

      if (1 > 0) {
        return (
          <div>
            <h3>Logins</h3>
            {/* <p>{this.state.typicodeViestit[2].title}</p> */}
            <button className="btn btn-primary" onClick={this.handleClickAddForm}>Add logins</button>

            <div className="row justify-content-center">
              <div className="col-md-6">
                <hr />
                <table className="table table-striped table-dark">
                  <thead>
                    <tr>
                      <th>Login ID</th>
                      <th>Firstname</th>
                      <th>Lastname</th>
                      <th>Username</th>
                      <th>Access level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.logins.map((loginRivi) => (
                      <tr key={loginRivi.loginID}>
                        <td>{loginRivi.loginID}</td>
                        <td>{loginRivi.firstname}</td>
                        <td>{loginRivi.lastname}</td>
                        <td>{loginRivi.username}</td>
                        <td>{loginRivi.accesslevel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <h3>Loading logins</h3>
          </div>
        );
      }
    }
    else if (this.state.show === "addLogins")
    {
      return (
      <div>
        {/* Kommentti */}
        <h3>Add login</h3>

        <button className="btn btn-secondary" onClick={this.handleClickShowLogins}>Show logins</button>
        <LoginAdd unmountMe={this.handleChildUnmount} />
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

export default LoginsFetch