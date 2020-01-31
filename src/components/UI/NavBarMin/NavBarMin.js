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
                <div><NavLink onClick ={props.toggler} className ="minNavv" activeClassName="active" exact to="/"> Home </NavLink></div>
                <div><NavLink onClick ={props.toggler} className ="minNavv" activeClassName="active" exact to="/products"> Products</NavLink></div>
                <div><NavLink onClick ={props.toggler} className ="minNavv" activeClassName="active" exact to="/services"> Services </NavLink></div>
                <div><NavLink onClick ={props.toggler} className ="minNavv" activeClassName="active" exact to="/aboutUs"> About </NavLink></div>
                <div><NavLink onClick ={props.toggler} className ="minNavv" activeClassName="active" exact to="/contact"> Contact Us</NavLink></div>
                <div><NavLink onClick ={props.toggler} className ="minNavv" activeClassName="active" exact to="/orders"> Orders</NavLink></div>
            </nav>
        </div>
    )
}

export default droplet