import React from 'react'
import {NavLink} from 'react-router-dom'
import './NavBarMin.css'

const droplet = (props) => {
    let toggled = props.toggled;
    let classes = ["NavBarMin"]
    
    if(toggled){
        classes.push("Show")
    }else{
        classes.push('HideView')
    }
    return (
        <div className={classes.join(" ")}>
            <div className="LogoMe">LOGO</div>
            <nav className="NavBarItems">
                <div><NavLink activeClassName="active" to="/"> Home </NavLink></div>
                <div><NavLink activeClassName="active" to="/products"> Products</NavLink></div>
                <div><NavLink activeClassName="active" to="/services"> Services </NavLink></div>
                <div><NavLink activeClassName="active" to="/about"> About </NavLink></div>
                <div><NavLink activeClassName="active" to="/contact"> Contact Us</NavLink></div>
                <div><NavLink activeClassName="active" to="/orders"> Orders</NavLink></div>
            </nav>
        </div>
    )
}

export default droplet