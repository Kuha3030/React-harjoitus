import React, {Component} from 'react'
// npm install react-router-dom
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CustomerAdd from './customerAdd'
import CustomerFetch from './customerFetch'
import ProductsFetch from './productsFetch'
import ProductsAdd from './productsAdd'

import DigitalClock from './digitalclock'
import Footer from './footer';
import Header from './header';
import LoginsFetch from './loginsFetch';

class Navigation extends Component {
  
  render() {
    return (
      <Router>
          {/* <Header /> */}
        <hr />

        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                {/* Navbarin alussa näkyvä barin "title" */}
                <Link to={"/"} className="navbar-brand">{" "}Northwind DB{" "}</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              
              {/* Varsinainen navbarin sisältö */}
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        {/* 1. dropdown menu */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Customers</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {/* Navbarin linkit */}
                                <li><Link to={{pathname: "/customerFetch", state: { message:"showCustomersLink" }}}  className="dropdown-item">Fetch Customers</Link></li>
                                <li><Link to={{pathname: "/customerFetch", state: { message:"addCustomersLink" }}} className="dropdown-item">Add Customers</Link></li>                               

                            </ul>
                        </li>
                        {/* 2. dropdown menu */}
                        <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Products</a>
                          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                              {/* Navbarin linkit */}
                              <li><Link to={{pathname: "/productsFetch", state: { message:"showProductsLink" }}}  className="dropdown-item">Fetch Products</Link></li>
                              <li><Link to={{pathname: "/productsFetch", state: { message:"addProductsLink" }}} className="dropdown-item">Add Products</Link></li>                               

                          </ul>
                        </li>
                        {/* 3. dropdown menu */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Logins</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link to={"/loginsFetch"} className="dropdown-item">Fetch Logins</Link></li>
                                    {/* <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                                </ul>
                        </li>
                    
                    </ul>
              </div>
            </div>
          </nav>
          <hr />

          <Switch>
            <Route exact path="/" component={DigitalClock} />
            <Route path="/customerFetch" component={CustomerFetch} />
            <Route path="/customerAdd" component={CustomerAdd} />
            <Route path="/loginsFetch" component={LoginsFetch} />
            <Route path="/productsFetch" component={ProductsFetch} />
            <Route path="/productsAdd" component={ProductsAdd} />


          </Switch>
          <hr />
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}
export default Navigation

