import React,{Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreator from '../../Store/actions'
import NavBarMin from '../../components/UI/NavBarMin/NavBarMin'
import Navbar from '../../components/Navbar/Navbar'
import Backdrop from '../../components/UI/Backdrop/Backdrop'
import ProductRow from '../../components/ProductRow/ProductRow'
import axios from '../../Axios'
import Aux from '../../hoc/Aux'
import Spinner from '../../components/UI/Spinner/Spinner'
import Login from '../Authentication/Login/Login'
import SignIn from '../Authentication/SignIn/SignIn'
import './Product.css'
import PreOrder from '../../components/PreOrder/PreOrder'


class Products extends Component{
    state = {
        imageBaseUrl : 'localhost:2020/api/machines/',
        ordered: false
    }
    componentDidMount(){
        if(!this.props.products){
            axios.get('api/product/allProducts')
            .then(response => {
                this.props.getMyProducts(response.data.data.data)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
    render(){
        let display = <Spinner />
        if(this.props.products){
            const totalProduct = [...this.props.products];
            let result = []
            for (let i = 0; i < totalProduct.length; i += 3) {
                let chunk = totalProduct.slice(i, i + 3)
                result.push(chunk)
            }
            let toDisplay = result.map((element, index) => (
                <ProductRow 
                    key={index}
                    rowProduct={element}
                />
            ))
            display = toDisplay
        }
        return (
            <Aux>
                    <PreOrder product={this.props.orderedProduct}/>
                    <p className="Product__Page__title">PRODUCTS</p>
                    {display}
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