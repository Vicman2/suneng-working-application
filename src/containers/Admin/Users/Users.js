import React,{Component} from 'react'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Aux from '../../../hoc/Aux'
import Axios from '../../../Axios'
import User from '../../../components/User/User'
import './Users.css'
import { connect } from 'react-redux'
import EditForm from './EditForm/EditForm'
import AddForm from './AddForm/AddForm'
import DeleteUser from './DeleteUser/DeleteUser'

class Users extends Component{
    state = {
        users: [],
        userToDelete: null,
        deleteItem : false,
        userToEdit: null,
        editUser : false, 
        addUser: false
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
    deleteUser=(userId)=>{
        
        
    }
    editUserHandler = async (userId)=>{
        const userDetail = this.state.users.find(user => user._id == userId);
        await this.setState((prev, props) => {
            return {editUser: true, userToEdit: userDetail}
        })
    }
    cancelUserEdit = ()=> {
        this.setState({editUser: false})
        this.getUsers()
    }
    addUserHandler = async()=>{
        await this.setState((prev, props) => {
            return {addUser: !prev.addUser}
        })
    }
    deleteUserHandler= async(userId)=>{
        const userDetail = this.state.users.find(user => user._id == userId);
        await this.setState((prev, props)=>{
            return {deleteItem: true, userToDelete:userDetail}
        })
    }
    cancelDeleteUser = ()=>{
        this.setState({deleteItem:false})
        this.getUsers()
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
            editUser = {()=> this.editUserHandler(element._id)}
            />
        ))
        return (
            <Aux>
                <EditForm 
                isClicked={this.state.editUser} 
                userDetails={this.state.userToEdit} 
                cancel={this.cancelUserEdit}/>
                <AddForm 
                clicked={this.addUserHandler}
                getUsers={this.getUsers}
                showUp={this.state.addUser}
                />
                <DeleteUser
                isClicked={this.state.deleteItem}
                cancel={this.cancelDeleteUser}
                userDetails={this.state.userToDelete}
                />
                <section>
                    <p className="Detail_User_Data_Header">USER DATA</p>
                </section>
                <section className="Operations">
                    <button onClick={this.addUserHandler}> 
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
            </Aux>
        )
    }
}
const propsMappedToState = (state)=> {
    return{
        token : state.userData.token
    }
}


export default connect(propsMappedToState) (Users)