import React from 'react';
import {withRouter} from 'react-router-dom'
import NavItem from './NavItem/NavItem'
import './NavItems.css'

const NavItems = (props) => {
    return (
        <ul className="NavItems">
            <NavItem name="Home" url="/" active/>
            <NavItem name="Products" url="#Suneng__Products" />
            <NavItem name="Services" url="#Suneng__Services" />
            <NavItem name="About Us" url="#De__Team" />
            <NavItem name="Contact" url="#Contacting__Us" />
        </ul>
    )
}

export default withRouter(NavItems);