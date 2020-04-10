import React, {Component} from 'react'
import Aux from '../../../hoc/Aux'
import './Products.css'
import Axios from '../../../Axios'
import { connect } from 'react-redux'
import Spinner from '../../../components/UI/Spinner/Spinner'
import ProductList from '../../../components/ProductList/ProductList'
import AddProduct from './AddProduct/AddProduct'

class Products extends Component{
    state = {
        productsFetched : [],
        deleteItem: false, 
        addProduct: false,
    }
    getProducts = ()=> {
        Axios.get('/api/product/allProducts', {
            headers: {
                'x-access-token': this.props.token
            }
        })
        .then(response => {
            this.setState({productsFetched: response.data.data.data})
        })
    }
    deleteProduct = (productId)=> {
        console.log(" I am working")
        this.setState({deleteItem:true})
        Axios.delete('/api/product/delete-product/' + productId, {
            headers: {
                'x-access-token': this.props.token
            }
        })
        .then(response => {
            this.setState({ deleteItem: false})
            this.getProducts()
        })
    }
    componentDidMount(){
        this.getProducts()
    }
    addProductHandler = async()=>{
        console.log(this.state.addProduct, "I am functioning")
        await this.setState((prev, props) => {
            return {addProduct: !prev.addProduct}
        })
    }
    render(){
        let toDisplay
        if(this.state.productsFetched.length === 0 ){
            toDisplay = <Spinner />
        }else{
            toDisplay = this.state.productsFetched.map(product => (
                <ProductList 
                name={product.name}
                details={product.details}
                source={product.machineSource}
                deleteProduct={()=>this.deleteProduct(product._id)}
                />
            ))
        }
        if(this.state.deleteItem){
            toDisplay = <Spinner />
        }
        return(
            <Aux>
                <AddProduct 
                getProduct={this.getProducts}
                clicked={this.addProductHandler}
                showUp={this.state.addProduct}
                />
                <div className="Products">
                    <div className="Product_Title_Div">
                        <p className="Product__Title">Products</p>
                    </div>
                    <section className="Operations">
                        <button onClick={this.addProductHandler}> 
                            <ion-icon name="add-circle-outline"></ion-icon>
                            <p>ADD PRODUCT</p>
                        </button>
                    </section>
                    <section className="actions">
                        <p className="Product_Name">Name</p>
                        <p className="Product_Details">Detail</p>
                        <p className="Product_Image">MachineImage</p>
                        <p className="sub_Operations"> Operations</p>
                    </section>
                    {toDisplay}
                </div>
            </Aux>
        )
    }
}

const propsMappedToState = (state)=> {
    return{
        token : state.userData.token
    }
}

export default connect(propsMappedToState) (Products)