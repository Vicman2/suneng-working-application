import React from 'react'
import Aux from '../../hoc/Aux'
import './AuthButton.css'

const AuthController = (props) => {
    return(
        <Aux>
            <div className="AuthWrapper">
                <div className="AuthButton">
                    <button onClick={props.clickedSignIn}>Sign in</button> 
                </div>
                <div className="AuthButton">
                    <button onClick={props.clickedLogin}>Login</button>
                </div>
            </div>
        </Aux>
    )
}

export default AuthController