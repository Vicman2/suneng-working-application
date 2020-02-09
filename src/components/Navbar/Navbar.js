import React from 'react'
import {connect} from 'react-redux'
import Aux from '../../hoc/Aux';
import NavItems from './NavItems/NavItems'
import AuthController from '../AuthController/AuthButton'
import Harmburger from '../UI/Harmburger/Harmburger'
import  './Navbar.css'
import { withRouter } from 'react-router-dom';

const navbar = (props) => {
    let Auth = null
    if(props.loggedIn){
        Auth = <div className="profilePicture">
                <ion-icon onClick={props.showProfile} name="person"></ion-icon>
            </div>
    }else{
        Auth = <AuthController 
        clickedLogin={props.loginClicked} 
        clickedSignIn={props.signinClicked}/>
    }
    return (
        <Aux>
            <div className="Navbar" id={props.isTop? "" : "ScrollDown"}>
                <Harmburger clicked={props.toToggle}/>
                <div className="Logo">LOGO</div>
                <NavItems />
                {Auth}
            </div>
        </Aux>
    )
}

const stateMappedToProps = (state) => {
    return {
        loggedIn : state.isLoggedIn
    }
}
export default connect(stateMappedToProps)(withRouter(navbar))