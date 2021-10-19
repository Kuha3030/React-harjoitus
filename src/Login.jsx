import React, { Component } from 'react'
//import md5 from 'md5'
import './App.css'

class LoginController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: '',
            Password: '',
            ShowLoginForm: true,
            LoggedInUser: ''
        }
        this.handleChangeUserName = this.handleChangeUserName.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const userFromLS = localStorage.getItem('user')
        if (userFromLS) {
            this.setState({ ...this.state, ShowLoginForm: false, LoggedInUser: userFromLS })
        }
    }

    logout() {
        localStorage.clear()
        this.setState({ ...this.state, LoggedInUser: '', ShowLoginForm: true })
    }

    handleChangeUserName(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, Username: syöte })
    }
    handleChangePassword(event) {
        //var syöte = md5(event.target.value)
        var syöte = (event.target.value)
        this.setState({ ...this.state, Password: syöte })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.authenticate()
    }

    authenticate() {
        const tunnukset = {
            username: this.state.Username,
            password: this.state.Password
        }

        const tunnuksetJson = JSON.stringify(tunnukset)

        let apiUrl = 'https://localhost:5001/api/authentication/'

        //let apiUrl = 'https://aspnet-react-northwind.azurewebsites.net/api/logins'

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: tunnuksetJson
        }).then((response) => response.json()) // Muutetaan javascriptiksi
            .then((vastaus) => {
                if (vastaus.username === undefined) {
                    alert("Kirjautuminen epäonnistui")
                }
                else {
                    localStorage.setItem('user', vastaus.username)
                    localStorage.setItem('token', vastaus.token)
                    localStorage.setItem('AccesslevelId', vastaus.accessLevelID)
                    this.setState({ ...this.state, LoggedInUser: vastaus.username, ShowLoginForm: false })
                }
            })

    }

    render() {
        if (this.state.ShowLoginForm === true) {
            return (
            <div className="container fluid">
            <div className="d-inline">
                <form className="input-group" onSubmit={this.handleSubmit}>
                    <input className="form-control" type="text" placeholder="UserName" onChange={this.handleChangeUserName} /> | 
                    <input className="form-control" type="password" placeholder="Password" onChange={this.handleChangePassword} />
                    <button className="btn btn-secondary btn-actions" type="submit">Login</button>      
                </form>
            </div>
            </div>

            )
        }
        else {
            return(
                <>            
                <div className="container fluid">
                <div className="d-inline">
                <p className="text-dark d-inline">Logged in as: {this.state.LoggedInUser}</p>
                <button className="btn btn-secondary btn-actions" onClick={() => this.logout()}>Kirjaudu ulos</button>
                </div>
                </div>
            </>
            )
        }
    }

}

export default LoginController