import React from 'react'
import {NavLink} from 'react-router-dom'
import './NavItem.css'

const NavItem = (props) => {
    return (
        <li className="NavItem">
            <NavLink activeClassName="active" exact={props.exact} to={props.url}> {props.name} </NavLink>
        </li>
    )
}

export default NavItem;