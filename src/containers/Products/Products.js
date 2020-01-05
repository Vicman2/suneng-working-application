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
        toggled: false,
        clickedLogin: false,
        clickedSignin:false,
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
    clickedLoginHandler = ()=>{
        this.setState((prev,props)=> {
            return {clickedLogin: !prev.clickedLogin}
        })
    }
    goToHome = ()=>{
        this.props.history.push('/products')
    }
    clickedSigninHandler =()=> {
        this.setState((prev, props) => {
            return {clickedSignin: !prev.clickedSignin}
        })
    }
    navigationToggler = () => {
        const toggledState = this.state.toggled
        this.setState({toggled: !toggledState})
    }
    onOrder = (name) => {
        this.setState({ordered: true})
        const product = this.props.products.find(elem => elem.name = name)
        this.props.setOrderProduct(product)
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
                 <section className="Structure">
                    <PreOrder product={this.props.orderedProduct}/>
                    <NavBarMin 
                    toggled={this.state.toggled}
                    />
                    <Backdrop toggled={this.state.toggled} clicked={this.navigationToggler}/>
                    <Login 
                    showUp={this.state.clickedLogin}
                    clicked={this.clickedLoginHandler}/>
                    <SignIn 
                    showUp ={this.state.clickedSignin}
                    clicked= {this.clickedSigninHandler}/>
                    <section className="NavBar_Top">
                            <Navbar
                            toToggle={this.navigationToggler}
                            isTop={this.state.isTop}
                            loginClicked={this.clickedLoginHandler}
                            signinClicked={this.clickedSigninHandler}/>
                    </section>
                    <p className="Product__Page__title">PRODUCTS</p>
                    {display}
                </section>
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