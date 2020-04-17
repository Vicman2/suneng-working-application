import React, {Component} from 'react'
import {connect} from 'react-redux'
import './Admin.css'
import Aux from '../../hoc/Aux'
import Products from './Products/Products'
import Users from './Users/Users'

class Admin extends Component{
    state = {
        products: false,
        users: true
    }
    swithToUserHandler = ()=> {
        this.setState({products: false, users:true})
    }
    switchToProductsHandler = () => {
        this.setState({products: true, users:false})
    }
    render(){
        let toDisplay
        let UsersClasses = ""
        let ProductClasses=""
        if(this.state.products){
            ProductClasses = "Active_Compo"
            toDisplay = <Products />
       }else{
           UsersClasses = "Active_Compo"
           toDisplay = <Users />
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