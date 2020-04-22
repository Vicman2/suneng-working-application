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
import InputWithIcon from '../../../components/UI/InputWithIcon/InputWithIcon'

class Users extends Component{
    state = {
        users: null,
        userToDelete: null,
        deleteItem : false,
        userToEdit: null,
        editUser : false, 
        addUser: false, 
        pageNumber: 0, 
        wantedUsers:10, 
        totalUsers: 0, 
        totalPages:null, 
        search:{
            elemType: "input",
            config: {
                type: 'text', 
                placeholder: "Search User"
            },
            value:"",
            isValid: false, 
            errorMessage: "Name must be up to 3 letters",
            touched: false,
            iconName:"search"
        }
    }
    getUsers = (pageNumber)=>{
        Axios.get(`/api/user/get-users?pageNumber=${pageNumber}&numberOfUsers=${this.state.wantedUsers}`, { 
            headers: {
                'x-access-token': this.props.token
            }
        })
        .then((response)=> {
            let assumedFloat = response.data.data.totalUsers/this.state.wantedUsers
            let totalPages = (assumedFloat % 1) === 0 ? assumedFloat : Math.floor(assumedFloat)  + 1
            this.setState((prev, props)=> {
                return {users:response.data.data.requestedUsers,
                 totalUsers: response.data.data.totalUsers,
                 pageNumber: prev.pageNumber === 0 ? prev.pageNumber+1: prev.pageNumber,
                 totalPages: totalPages
                }})
        }).catch((error) => {
            console.log(error.response)
        })
    }
    componentDidMount(){
        this.getUsers(this.state.pageNumber +1);
    }
    previousUsers = () => {
        let prevPage = this.state.pageNumber - 1 >= 1 ? this.state.pageNumber -1: 1
        if(prevPage < this.state.totalPages && prevPage>=1){
            this.getUsers(prevPage)
            this.setState((prev, props) => {
                return {pageNumber : prev.pageNumber -1}
            })
        }
    }
    nextUsers = () => {
        let nextPage = this.state.pageNumber + 1 <= this.state.totalPages ? this.state.pageNumber +1: this.state.pageNumber
        if(nextPage > this.state.pageNumber && nextPage<= this.state.totalPages){
            this.getUsers(nextPage)
            this.setState((prev, props) => {
                return {pageNumber : prev.pageNumber +1}
            })
        }
    }
    editUserHandler = async (userId)=>{
        const userDetail = this.state.users.find(user => user._id == userId);
        await this.setState((prev, props) => {
            return {editUser: true, userToEdit: userDetail}
        })
    }
    cancelUserEdit = ()=> {
        this.setState({editUser: false})
        this.getUsers(this.state.pageNumber)
    }
    addUserHandler = async()=>{
        await this.setState((prev, props) => {
            return {addUser: !prev.addUser, pageNumber: 1}
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
        this.getUsers(this.state.pageNumber)
    }
    refresh = ()=>{
        this.setState({pageNumber: 1})
    }
    render(){
        let toShow = <Spinner />
        if(this.state.users && this.state.users.length > 0){
            toShow = this.state.users.map((element,index )=> {
                return(
                    <User 
                    index={index}
                    key={element._id}
                    id={element._id}
                    name={element.name}
                    email={element.email}
                    role={element.role}
                    deleteUser ={() =>this.deleteUserHandler(element._id)}
                    editUser = {()=> this.editUserHandler(element._id)}
                    />
            )})
        }
        
        let prev, next;
        if(this.state.pageNumber>=2){
            prev = <p className="Arrow" onClick={this.previousUsers}>Previous</p>
        }else{
            prev = null
        }
        if(this.state.pageNumber< this.state.totalPages){
            next = <p className="Arrow" onClick={this.nextUsers}>Next</p>
        }else{
            next = null
        }
        
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
                refresh={this.refresh}
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
                        <p>ADD USER</p>
                    </button>
                    <div className="Pagination">
                        {prev}
                        <p> {this.state.pageNumber} of  {this.state.totalPages} </p>
                        {next}
                    </div>
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