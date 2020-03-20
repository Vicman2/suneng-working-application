import React, {Component} from 'react'
import {connect} from 'react-redux'
import './Admin.css'
import Aux from '../../hoc/Aux'
import Axios from '../../Axios'
import Spinner from '../../components/UI/Spinner/Spinner'
import User from '../../components/User/User'

class Admin extends Component{
    state = {
        users: [],
        deleteItem : false
    }
    getUsers = ()=>{
        Axios.get('/api/user/get-users', {
            headers: {
                'x-access-token': this.props.token
            }
        })
        .then((response)=> {
            this.setState({users:response.data.data})
        }).catch((error) => {
            console.log(error.response)
        })
    }
    componentDidMount(){
        this.getUsers();
    }
    deleteUserHandler(userId){
        this.setState({deleteItem: true})
        Axios.delete("/api/user/delete-user/"+userId, {
            headers: {
                'x-access-token': this.props.token
            }
        })
        .then(response => {
            this.getUsers();
            this.setState({deleteItem: false})
        })
    }
    render(){
        let toShow = this.state.users.map(element => (
            <User 
            key={element._id}
            id={element._id}
            name={element.name}
            email={element.email}
            role={element.role}
            deleteUser ={() =>this.deleteUserHandler(element._id)}
            />
        ))
        if(this.state.deleteItem){
            toShow = <Spinner />
        }
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
                                    <button> 
                                        <ion-icon name="add-circle-outline"></ion-icon>
                                        <p>ADD USER</p></button>
                                </section>
                                <section className="actions">
                                    <p className="User_Id">Id</p>
                                    <p className="User_Name">Name</p>
                                    <p className="User_Email">Email</p>
                                    <p className="User_Role">Role</p>
                                    <p className="sub_Operations"> Operations</p>
                                </section>
                                <section className="AllUser_Details">
                                    {toShow}
                                </section>
                            </div>
                        </div>
                </div>

            </Aux>
        )
    }
}

const propsMappedToState = (state)=> {
    return{
        token : state.userData.token
    }
}


export default connect(propsMappedToState)(Admin)