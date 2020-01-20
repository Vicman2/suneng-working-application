import React from 'react';
import {withRouter} from 'react-router-dom'
import NavItem from './NavItem/NavItem'
import './NavItems.css'

const NavItems = (props) => {
    return (
        <ul className="NavItems">
            <NavItem name="Home" url="/" exact/>
            <NavItem name="Products" exact url="/products"/>
            <NavItem name="Services" exact url="/services" />
            <NavItem name="About Us" exact url="/aboutUs" />
            <NavItem name="Contact" exact url="/contact" />
            <NavItem name="Orders" url="/orders" />
        </ul>
    )
}

export default withRouter(NavItems);