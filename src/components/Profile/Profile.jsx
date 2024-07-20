import React from 'react'
import {connect} from 'react-redux'
import Backdrop from '../UI/Backdrop/Backdrop'
import './Profile.css'
import Aux from '../../hoc/Aux'


const Profile = (props) => {
    let classes =["Profile"];
    if(props.isToggled && props.isLoggedIn){
        classes.push("show__Profile")
    }else if(!props.isLoggedIn){
        classes.push("hide__Profile")
    }else{
        classes.push("hide__Profile")
    }
    return(
        <Aux>
            <Backdrop clicked={props.removeProfile} toggled={props.isToggled && props.isLoggedIn}/>
            <div className={classes.join(" ")}>
                <section className="Profile__Top">
                    <p><b>Your Account</b></p>
                    <ion-icon onClick={props.removeProfile} name="close"></ion-icon>
                </section>
                <section className="profile__Icon">
                    <ion-icon name="person"></ion-icon>
                </section>
                <section className="Profile__Details">
                    <p> {props.userData.name} </p>
                    <p> {props.userData.email} </p>
                    <p>  {props.userData.role} </p>
                </section>
                <section className="userLogOut__Button">
                    <button onClick={props.logout}>Logout</button>
                </section>
            </div>
        </Aux>
    )
}

const propsMappedToProps = (state) => {
    return {
        userData : state.userData, 
        isLoggedIn: state.isLoggedIn,
    }
}

export default connect(propsMappedToProps)(Profile)