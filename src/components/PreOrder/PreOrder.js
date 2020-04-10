import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import  * as actionCreator from "../../Store/actions";
import Axios from '../../Axios'
import Aux from '../../hoc/Aux'
import './PreOrder.css'
import Backdrop from '../UI/Backdrop/Backdrop'
import NotAuth from '../UI/NotAuthenticated/NotAuthenticated';
import Spinner from '../UI/Spinner/Spinner';


const PreOrder = (props) => {
    const source = 'https://suneng-backend.herokuapp.com/api/machines/' + props.productToDisplay.machineSource
    const classes=["Pre__Order"]
    const showNotAuthorizes = props.preOrdered && !props.loggedIn 
    if(!props.preOrdered || !props.loggedIn ){
        classes.push("Hide__PreOrder");
    }else{
        classes.push("Show__PreOrder")
    }
    let toDisplay = <Aux>
            <div className="double__Button">
                <button className="cancel__button" onClick={props.cancelOrder}>Cancel</button>
                <button className="continue__button" onClick={continuePreOrder}>Continue</button>
            </div>
        </Aux>
    if(props.finishedPreOrder){
        toDisplay = <Spinner />
    }
    function continuePreOrder(){
        console.log(props.token, "Token")
        props.continueOrder();
        Axios({
            method:'post', 
            url: "/api/order/order-product",
            headers: {
                'x-access-token': props.token
            },
            data: {
                productId: props.productToDisplay._id
            },
        }).then(response => {
            props.doneWithOrder();
            console.log(response)
        }).catch(error => {
            console.log(error.response)
        })
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
                    {toDisplay}
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
        productToDisplay: state.orderedProduct,
        token: state.userData.token,
        finishedPreOrder: state.finishedOrder,
        accumulatedOrder: state.orderAccumulated
    }
}
const actionMappedToProps = (dispatch)=> {
    return {
        cancelOrder : ()=> dispatch(actionCreator.cancelPreOrder()),
        continueOrder: ()=> dispatch(actionCreator.continuePreOrder()),
        doneWithOrder: ()=>dispatch(actionCreator.finishedPreOrder())
    }
}
export  default connect(propsMappedToState, actionMappedToProps)(withRouter(PreOrder))