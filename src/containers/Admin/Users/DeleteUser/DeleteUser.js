import React, {Component} from 'react'
import {connect} from 'react-redux'
import './DeleteUser.css'
import Aux from '../../../../hoc/Aux'
import Backdrop from '../../../../components/UI/Backdrop/Backdrop'
import Axios from '../../../../Axios'
import Spinner from '../../../../components/UI/Spinner/Spinner'


class DeleteUser extends Component{
    state = {
        detailOfUser :{
            _id:'',
            name:'',
            email:'',
            role:'',
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.userDetails !== this.props.userDetails){
            this.setState({detailOfUser: this.props.userDetails})
        }
    }
    deleteTheUser = async()=>{
        const userId = this.props.userDetails._id
        Axios.delete("/api/user/delete-user/"+userId, {
            headers: {
                'x-access-token': this.props.token
            }
        })
        .then(response => {
            this.props.cancel();
        })
        .catch(err=>{
            console.log(err.response)
        })
    }
    render(){
        let isClicked = this.props.isClicked;
    
        let classes = ["DeleteUserWrapper"]
        if(isClicked){
            classes.push('ShowDeleteUser')
        }else{
            classes.push('hideDeleteUser')
        }
        let toDisplay

        if(this.props.isClicked && !this.props.userDetails){
            toDisplay = <Spinner />
        }else{
            toDisplay = <Aux>
                <div className={classes.join(" ")}>
                    <div className="DeleteUser">
                        <strong>Do you really want to delete the user ?</strong>
                        <div className="Field_Column">
                            <p className="UserFields">Id:</p>
                            <p className="FieldValue">{this.state.detailOfUser._id}</p>
                        </div>
                        <div className="Field_Column">
                            <p className="UserFields">Name:</p>
                            <p className="FieldValue">{this.state.detailOfUser.name}</p>
                        </div>
                        <div className="Field_Column">
                            <p className="UserFields">email:</p>
                            <p className="FieldValue">{this.state.detailOfUser.email}</p>
                        </div>
                        <div className="Field_Column">
                            <p className="UserFields">Role:</p>
                            <p className="FieldValue">{this.state.detailOfUser.role}</p>
                        </div>
                        <div>
                            <div className="delete_Commands">
                                <p className="cancel_delete_command" onClick={this.props.cancel}>Cancel</p>
                                <p className="continue_delete_command" onClick={this.deleteTheUser}>Continue</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        }
        return(
            <Aux>
                <Backdrop toggled={this.props.isClicked} clicked={this.props.cancel} />
                {toDisplay}
            </Aux>
        )
    }
}

const propsMappedToState = (state)=> {
    return{
        token : state.userData.token
    }
}
export default connect(propsMappedToState) (DeleteUser)