import React from 'react'

import  './Order.css'
import Aux from '../../hoc/Aux'


const Order = (props) => {
    const date = new Date(props.date)
    const dateToShow = date.toString()

    return (
        <Aux>
            <div className="Order">
                <p>{props.id}</p>
                <p>{props.productName} </p>
                <p> {dateToShow} </p>
                <p className="status"> {props.deliveryStatus} </p>
            </div>
        </Aux>
    )
}

export default Order