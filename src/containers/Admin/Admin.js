import React, {Component} from 'react'
import {connect} from 'react-redux'
import './Admin.css'
import Aux from '../../hoc/Aux'
import Products from './Products/Products'
import Users from './Users/Users'
import Contact from './Contact/Contact'

class Admin extends Component{
    state = {
        users: true, 
        products: false,
        contact: false
    }
    swithToUserHandler = ()=> {
        this.setState({products: false, users:true,contact:false})
    }
    switchToProductsHandler = () => {
        this.setState({products: true, users:false, contact:false})
    }
    switchToContactHandler = () => {
        this.setState({products:false, users: false, contact: true})
    }
    render(){
        let toDisplay
        let UsersClasses = ""
        let ProductClasses=""
        let contactClasses = ""
        if(this.state.products){
            ProductClasses = "Active_Compo"
            toDisplay = <Products />
       }else if(this.state.users){
           UsersClasses = "Active_Compo"
           toDisplay = <Users />
       }else if(this.state.contact){
            contactClasses = "Active_Compo"
            toDisplay = <Contact />
       }
        return(
            <Aux>
                <div className="Admin">
                        <h2 className="Admin_Header">ADMINISTRATION</h2>
                        <div className="Admin_Area">
                            <div className="De_Components">
                                <section className={UsersClasses}>
                                    <p onClick={this.swithToUserHandler}> User Management</p>
                                </section> 
                                <section className={ProductClasses}>
                                    <p onClick={this.switchToProductsHandler}>Product Management</p>
                                </section>
                                <section className={contactClasses}>
                                    <p onClick={this.switchToContactHandler}>Contact</p>
                                </section>
                            </div>
                            <div className="Details">
                                {toDisplay}
                            </div>
                        </div>
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


export default connect(propsMappedToState)(Admin)