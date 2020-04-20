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
        productToEdit:null,
        pageNumber: 0, 
        wantedProduct:10, 
        totalProducts: 0, 
        totalPages: null
    }
    getProducts = (pageNumber)=> {
        Axios.get(`/api/product/allProducts?pageNumber=${pageNumber}&numberOfProducts=${this.state.wantedProduct}`, {
            headers: {
                'x-access-token': this.props.token
            }
        })
        .then(response => {
            console.log(response.data.data.data)
            let assumedFloat = response.data.data.data.totalProducts/this.state.wantedProduct
            let totalPages = (assumedFloat % 1) === 0 ? assumedFloat : Math.floor(assumedFloat)  + 1
            this.setState((prev, props)=>{
                return {productsFetched: response.data.data.data.requestedProduct, 
                totalProducts: response.data.data.data.totalProducts,
                pageNumber: prev.pageNumber === 0 ? prev.pageNumber+1: prev.pageNumber,
                totalPages: totalPages
                }
            })
        })
    }
    deleteProductHandler = (productId)=> {
        const prodDetail = this.state.productsFetched.find(prod => prod._id == productId);
        this.setState({deleteItem:true, productToDelete: prodDetail})
    }
    cancelDeleteProduct = ()=>{
        this.setState({deleteItem:false})
        this.getProducts(this.state.pageNumber)
    }
    editProductHandler = (productId)=>{
        const prodDetail = this.state.productsFetched.find(prod => prod._id == productId);
        this.setState({editProduct:true, productToEdit: prodDetail})
    }
    cancelEdithandler = ()=>{
        this.setState({editProduct:false})
        this.getProducts(this.state.pageNumber)
    }
    componentDidMount(){
        this.getProducts(1)
    }
    addProductHandler = async()=>{
        await this.setState((prev, props) => {
            return {addProduct: !prev.addProduct, pageNumber: 1}
        })
    }
    previousProducts = () => {
        let prevPage = this.state.pageNumber - 1 >= 1 ? this.state.pageNumber -1: 1
        if(prevPage < this.state.totalPages && prevPage>=1){
            this.getProducts(prevPage)
            this.setState((prev, props) => {
                return {pageNumber : prev.pageNumber -1}
            })
        }
    }
    nextProducts = () => {
        let nextPage = this.state.pageNumber + 1 <= this.state.totalPages ? this.state.pageNumber +1: this.state.pageNumber
        console.log(nextPage)
        if(nextPage > this.state.pageNumber && nextPage<= this.state.totalPages){
            this.getProducts(nextPage)
            this.setState((prev, props) => {
                return {pageNumber : prev.pageNumber +1}
            })
        }
    }
    refresh = ()=>{
        this.setState({pageNumber: 1})
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
        let prev, next;
        if(this.state.pageNumber>=2){
            prev = <p className="Arrow" onClick={this.previousProducts}>Previous</p>
        }else{
            prev = null
        }
        if(this.state.pageNumber< this.state.totalPages){
            next = <p className="Arrow" onClick={this.nextProducts}>Next</p>
        }else{
            next = null
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
                        <p className="Product__Title">PRODUCTS</p>
                    </div>
                    <section className="Operations">
                        <button onClick={this.addProductHandler}> 
                            <ion-icon name="add-circle-outline"></ion-icon>
                            <p>ADD PRODUCT</p>
                        </button>
                        <div className="Pagination">
                            {prev}
                            <p> {this.state.pageNumber} of  {this.state.totalPages} </p>
                            {next}
                        </div>
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