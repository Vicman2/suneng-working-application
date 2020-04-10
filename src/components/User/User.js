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
                    <div className="trash-icon"><ion-icon onClick={props.deleteUser} name="trash"></ion-icon></div>
                    <div className="edit-icon"><ion-icon onClick={props.editUser} name="create"></ion-icon></div>
                </p>
            </div>
        </Aux>
    )
}

export default User