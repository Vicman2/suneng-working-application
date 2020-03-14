import React, {Component} from 'react'
import './Admin.css'
import Aux from '../../hoc/Aux'

class Admin extends Component{
    render(){
        return(
            <Aux>
                <div className="Admin">
                        <h2 className="Admin_Header">ADMINISTRATION</h2>
                        <div className="Admin_Area">
                            <div className="De_Components">
                                <section>
                                    <p> User Management</p>
                                </section>
                                <section>
                                    <p>Product Management</p>
                                </section>
                            </div>
                            <div className="Details">
                                <section>
                                    <p className="Detail_User_Data_Header">USER DATA</p>
                                </section>
                                <section className="Operations">
                                    <button>Add User</button>
                                    
                                </section>
                            </div>
                        </div>
                </div>

            </Aux>
        )
    }
}


export default Admin