import React from 'react'
import Aux from '../../hoc/Aux'
import './User.css'

const User = (props)=> {
    return (
        <Aux>
            <div className="User">
                <p className="User_Id">{props.id} </p>
                <p className="User_Name">{props.name} </p>
                <p className="User_Email">{props.email} </p>
                <p className="User_Role">{props.role} </p>
                <p className="Operation_Icons sub_Operations">
                    <ion-icon onClick={props.deleteUser} name="trash"></ion-icon>
                    <ion-icon name="create"></ion-icon>
                </p>
            </div>
        </Aux>
    )
}

export default User