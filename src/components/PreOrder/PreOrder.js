import React from 'react'
import {connect} from 'react-redux'
import  * as actionCreator from "../../Store/actions";
import Aux from '../../hoc/Aux'
import './PreOrder.css'
import Backdrop from '../UI/Backdrop/Backdrop'
import NotAuth from '../UI/NotAuthenticated/NotAuthenticated';


const PreOrder = (props) => {
    const source = 'http://localhost:2020/api/machines/' + props.productToDisplay.machineSource
    const classes=["Pre__Order"]
    const showNotAuthorizes = props.preOrdered && !props.loggedIn 
    if(!props.preOrdered || !props.loggedIn){
        classes.push("Hide__PreOrder");
    }else{
        classes.push("Show__PreOrder")
    }
    let toRender = (
        <Aux>
            <Backdrop toggled={props.preOrdered && props.loggedIn}/>
            <div className={classes.join(" ")}>
                <div className="Pre__Order__Content">
                    <p className="Machine__Title">{props.productToDisplay.name} </p>
                    <div className="Image__Pre__Order__Container">
                        <img src={source} alt="name" />
                    </div>
                    <p className="product__Details">{props.productToDisplay.details}
                    </p>
                    <p className="product__Details">Hey!! we will get back to you in not less than 24 hours</p>
                    <div className="double__Button">
                        <button className="cancel__button" onClick={props.cancelOrder}>Cancel</button>
                        <button className="continue__button">Continue</button>
                    </div>
                </div> 
            </div>
        </Aux>
    )
    if(!props.loggedIn){
        toRender = <Aux>
            <Backdrop toggled={showNotAuthorizes}/>
            <NotAuth show={showNotAuthorizes}/>
        </Aux>
    }
    return (
        <Aux>
                {toRender}
        </Aux>
    )
}

const propsMappedToState = (state) => {
    return {
        loggedIn: state.isLoggedIn,
        preOrdered : state.preOrdered,
        productToDisplay: state.orderedProduct
    }
}
const actionMappedToProps = (dispatch)=> {
    return {
        cancelOrder : ()=> dispatch(actionCreator.cancelPreOrder())
    }
}
 
export  default connect(propsMappedToState, actionMappedToProps)(PreOrder)