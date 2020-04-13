import React from 'react'
import './SuccessMessage.css'
import Aux from '../../hoc/Aux'

const SuccessMessage = (props) => {
    return(
        <Aux>
            <div className="SuccessMessage"> {props.message} </div>
        </Aux>
    )
}

export default SuccessMessage