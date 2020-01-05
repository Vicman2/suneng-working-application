import React from 'react'
import './NavItem.css'

const NavItem = (props) => {
    console.log()
    return (
        <li className={props.active? "" : "NavItem"} 
        id={props.active? "active" : null} >
            <a  href={props.url}> {props.name} </a></li>
    )
}

export default NavItem;