import React, {Component} from 'react'
import Aux from '../../../hoc/Aux'
import './Products.css'
import Axios from '../../../Axios'
import { connect } from 'react-redux'
import Spinner from '../../../components/UI/Spinner/Spinner'
import ProductList from '../../../components/ProductList/ProductList'
import AddProduct from './AddProduct/AddProduct'
import DeleteProduct from './DeleteProduct/DeleteProduct'
import EditProduct from './EditProduct/EditProduct'

class Products extends Component{
    state = {
        productsFetched : [],
        productToDelete: null,
        deleteItem: false, 
        addProduct: false,
        editProduct: false, 
        productToEdit:null
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
    deleteProductHandler = (productId)=> {
        const prodDetail = this.state.productsFetched.find(prod => prod._id == productId);
        this.setState({deleteItem:true, productToDelete: prodDetail})
    }
    cancelDeleteProduct = ()=>{
        this.setState({deleteItem:false})
        this.getProducts()
    }
    editProductHandler = (productId)=>{
        const prodDetail = this.state.productsFetched.find(prod => prod._id == productId);
        this.setState({editProduct:true, productToEdit: prodDetail})
    }
    cancelEdithandler = ()=>{
        this.setState({editProduct:false})
        this.getProducts()
    }
    componentDidMount(){
        this.getProducts()
    }
    addProductHandler = async()=>{
        await this.setState((prev, props) => {
            return {addProduct: !prev.addProduct}
        })
    }
    render(){
        let toDisplay
        if(this.state.productsFetched.length === 0 ){
            toDisplay = <Spinner />
        }else{
            toDisplay = this.state.productsFetched.map((product,index) => {
                return(
                <ProductList 
                key={product.name}
                index={index}
                name={product.name}
                details={product.details}
                source={product.machineSource}
                deleteProduct={()=>this.deleteProductHandler(product._id)}
                editProduct={()=>this.editProductHandler(product._id)}
                />
            )})
        }
        if(this.state.deleteItem){
            toDisplay = <Spinner />
        }
        return(
            <Aux>
                <AddProduct 
                getProducts={this.getProducts}
                clicked={this.addProductHandler}
                showUp={this.state.addProduct}
                />
                <DeleteProduct 
                prodDetails={this.state.productToDelete}
                isClicked={this.state.deleteItem}
                cancel={this.cancelDeleteProduct}
                />
                <EditProduct
                prodDetails ={this.state.productToEdit}
                isClicked={this.state.editProduct}
                cancel={this.cancelEdithandler}
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