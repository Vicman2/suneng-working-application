import React from 'react'
import Aux from '../../hoc/Aux'
import './ContactDetails.css'


const contactDetails = (props) => {
    return (

        <Aux>
            <p className="We__Are__Here">We are here</p> 
            <p className="To__Serve">To serve you</p>
            
            <p className="Section__Header">Address:</p>

            <p>HEAD OFFICE: </p>
            <p className="Contact__Value">Amigbo lane opposite CIC shopping plaza uwani Enugu.</p>
            <p>BRANCH OFFICE:</p> 
            <address className="Contact__Value">10 CIC shopping plaza uwani Enugu.</address>

            <p className="Section__Header">Telephone</p>

            <p className="Contact__Value">+2348107647997, +2349028315669, +2348063385504</p>

            <p className="Section__Header">Email</p>

            <p className="Contact__Value">sunengworksltd@gmail.com</p>
        </Aux>
    )
}


export default contactDetails