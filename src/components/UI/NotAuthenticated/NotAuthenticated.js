import React from 'react'
import { connect } from 'react-redux'
import Aux from '../../../hoc/Aux'
import Backdrop from '../Backdrop/Backdrop'
import * as actionCreator from '../../../Store/actions'
import './NotAuthenticated.css'

const notAuth = (props) => {
    const cancel = props.cancelPage || props.cancelPreOrder
    const classes = ["Not__Authenticated"];
    if(!props.show){
        classes.push("Hide__Not__Authenticated")
    }else{
        classes.push('Show__Not__Authenticated')
    }
    return (
        <Aux>
            <div className={classes.join(" ")}>
                <div>
                    <section className="icon_Container">
                        <ion-icon onClick={cancel} name="close"></ion-icon>
                    </section>
                    <p>You are not authenticated yet</p>
                    <p>To Proceed, please, signup or login</p> 
                </div>
            </div>
        </Aux>
    )
}

const actionMappedToProps = (dispatch) => {
    return {
        cancelPreOrder: ()=>dispatch(actionCreator.cancelPreOrder() )
    }
}

export default connect(null, actionMappedToProps) (notAuth)