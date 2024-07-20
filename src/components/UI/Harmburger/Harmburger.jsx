import React from 'react'
import './Harmburger.css'

const Harmburger = (props) => {
    return (
        <div className="Harmburger" onClick={props.clicked}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default Harmburger