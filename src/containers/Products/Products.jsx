import React,{Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreator from '../../Store/actions'
import ProductRow from '../../components/ProductRow/ProductRow'
import Axios from '../../Axios'
import Aux from '../../hoc/Aux'
import Spinner from '../../components/UI/Spinner/Spinner'
import './Product.css'
import PreOrder from '../../components/PreOrder/PreOrder'
import InputWithIcon from '../../components/UI/InputWithIcon/InputWithIcon'


class Products extends Component{
    state = {
        productsFetched: null,
        imageBaseUrl : 'localhost:2020/api/machines/',
        pageNumber: 0, 
        wantedProduct:9, 
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
    componentDidMount(){
        this.getProducts(1)
    }
    render(){
        let display = <Spinner />
        if(this.state.productsFetched){
            const totalProduct = [...this.state.productsFetched];
            let result = []
            for (let i = 0; i < totalProduct.length; i += 3) {
                let chunk = totalProduct.slice(i, i + 3)
                result.push(chunk)
            }
            let toDisplay = result.map((element, index) => (
                <ProductRow 
                    key={index}
                    rowProduct={element}
                    showOrder
                />
            ))
            display = toDisplay
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
        return (
            <Aux>
                    <PreOrder product={this.props.orderedProduct}/>
                    <p className="Product__Page__title">PRODUCTS</p>
                    <div className="Products_Pagination">
                        {prev}
                        <p> {this.state.pageNumber} of  {this.state.totalPages} </p>
                        {next}
                    </div>
                    {display}
                    <div className="Products_Pagination">
                        {prev}
                        <p> {this.state.pageNumber} of  {this.state.totalPages} </p>
                        {next}
                    </div>
            </Aux>
        )
    }
}
const propsMappedToState = (state) => {
    return {
        products : state.products
    }
}
const action = (dispatch) => {
    return {
        getMyProducts : (payload) => dispatch(actionCreator.companyProduct(payload))
    }
}



export default connect(propsMappedToState, action)(Products)