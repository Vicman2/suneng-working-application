import React from 'react'
import './SingleDetail.css'
import Aux from '../../hoc/Aux'

const SingleDetail = (props) =>{
    return(
        <Aux>
            <div className="SingleDetail">
                <p className="detailerName">{props.name} </p>
                <p className="detailerEmail">{props.email} </p>
                <p className="detailerPhone">{props.phone} </p>
                <p className="detailerSubject">{props.subject} </p>
            </div>
        </Aux>
    )
}

export default SingleDetail