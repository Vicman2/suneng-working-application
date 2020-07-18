import React from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import NavItem from './NavItem/NavItem'
import './NavItems.css'

const NavItems = (props) => {
    let admini = null
    if(props.role === "admin"){
        admini = <NavItem name="Admin" exact url="/admin" />
    }
    return (
        <ul className="NavItems">
            <NavItem name="Home" url="/" exact/>
            <NavItem name="Products" exact url="/products"/>
            <NavItem name="Services" exact url="/services" />
            <NavItem name="About Us" exact url="/aboutUs" />
            <NavItem name="Contact" exact url="/contact" />
            <NavItem name="Orders" exact url="/orders" />
            {admini}
        </ul>
    )
}

const propsMappedToProps = (state) => {
    return{
        role : state.userData.role
    }
}

export default connect(propsMappedToProps)(withRouter(NavItems));