import React from 'react'
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
                <div><a href="/">Home</a></div>
                <div><a href="/">Product</a></div>
                <div><a href="/">Services</a></div>
                <div><a href="/">About Us</a></div>
                <div><a href="/">Contact</a></div>
            </nav>
        </div>
    )
}

export default droplet