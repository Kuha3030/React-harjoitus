import { render } from "@testing-library/react";
import React, {Component} from "react";
import './App.css'
import ProductsAdd from './productsAdd';
import CustomerEdit from './customerEdit';
import CustomerDelete from './customerDelete';
import Helpit from './helpit';
import iconEdit from './img/edit-48.png';
import iconDelete from './img/delete-48.png';

class ProductsFetch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            recordcount: 0,
            from: 0,
            to: 9,
            userId: "",
            show: "showProducts",
            showHelp: false,
            productToEdit: {},
            productToDelete: {}
        }
        this.handeChildUnmount = this.handleChildUnmount.bind(this)
        // this.handleClickEdit = this.handleClickEdit.bind(this)
        // this.handleClickDelete = this.handleClickDelete.bind(this)

    }

    handleChildUnmount() {
      // this.setState({ show: "showProducts" })

      this.fetchProducts()
  }
  handleClickAddForm = () => {
    this.setState({show: 'addProducts'})
  }

  handleClickShowProducts = () => {
    this.setState({show: 'showProducts'})
  }
  

    componentDidMount() {
        this.fetchProducts();

        
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
          this.fetchProducts
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
          this.fetchProducts
        );
      }
    };
    
  fetchProducts() {
    //let uri = 'https://jsonplaceholder.typicode.com/todos'; //haku ilman rajoituksia
    //let uri='https://jsonplaceholder.typicode.com/todos?_page='+this.state.page+'&_limit='+this.state.limit
    let uri =
      "https://localhost:5001/api/products/from/" +
      this.state.from +
      "/to/" +
      this.state.to;

    fetch(uri)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ products: json, recordcount: json.length });
      });
    }

  render() {
      
    if (this.state.show === "showProducts")
    {
    return(
      <div>
      <button className="btn btn-primary" onClick={this.handleClickAddForm}>Add products</button>

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
          <th>Product name</th>
          <th>Price</th>
          <th>Units in stock</th>
          <th></th>

        </tr>
      </thead>
      <tbody>
        {this.state.products.map((prodRivi) => (
          <tr key={prodRivi.productId}>
            <td>{prodRivi.productId}</td>
            <td>{prodRivi.productName}</td>
            <td>{prodRivi.unitPrice}</td>     
            <td>{prodRivi.unitsInStock}</td>                                        
                                   
            <td><button className="btn btn-actions btn-secondary" onClick={() => this.handleClickEdit(prodRivi)}><img src={iconEdit} width="20px"/></button>
            <button className="btn btn-actions btn-warning" onClick={() => this.handleClickDelete(prodRivi)}><img src={iconDelete} width="20px"/></button></td>
     
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  </div>
  </div>
  )}
  if (this.state.show === "addProducts")
  {
    return (
      <div>
        {/* Kommentti */}
        <button className="btn btn-secondary" onClick={this.handleClickShowProducts}>Show products</button>
        <ProductsAdd unmountMe={this.handleChildUnmount} />
      </div>         
      )
  }
    //   else 
    //   {
    //     return (
    //         <h3>Products</h3>
    //       );
     
  }

}

export default ProductsFetch
