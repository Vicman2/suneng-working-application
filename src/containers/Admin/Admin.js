import React, {Component} from 'react'
import {connect} from 'react-redux'
import './Admin.css'
import Aux from '../../hoc/Aux'
import Products from './Products/Products'
import Users from './Users/Users'

class Admin extends Component{
    state = {
        products: true
    }
    swithToUserHandler = ()=> {
        this.setState({products: false})
    }
    switchToProductsHandler = () => {
        this.setState({products: true})
    }
    render(){
        let toDisplay
        if(this.state.products){
            toDisplay = <Products />
       }else{
           toDisplay = <Users />
       }
        return(
            <Aux>
                <div className="Admin">
                        <h2 className="Admin_Header">ADMINISTRATION</h2>
                        <div className="Admin_Area">
                            <div className="De_Components">
                                <section>
                                    <p onClick={this.swithToUserHandler}> User Management</p>
                                </section>
                                <section>
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