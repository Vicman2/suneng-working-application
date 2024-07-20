import React, {Component} from 'react'
import {connect} from 'react-redux'
import Aux from '../../../../hoc/Aux'
import Spinner from '../../../../components/UI/Spinner/Spinner'
import Backdrop from '../../../../components/UI/Backdrop/Backdrop'
import InputWithIcon from '../../../../components/UI/InputWithIcon/InputWithIcon'
import Axios from '../../../../Axios'
import './EditForm.css'

class EditForm extends Component{
    state = {
        isFormValid: true,
        propsIsAvailable: null,
        isSubmited: false,
        loading: false,
        serverError: false,
        invalidFormErrorMessage:"Please, fill the forms accurately before you submit",
        formInputs: {
            name: {
                elemType: "input", 
                config: {
                    type: 'text', 
                    placeholder: "Your name"
                },
                value: '',
                validation: function(){
                    let valid = false;
                    if(this.value.trim() !== '' && this.value.length >=3 && this.value.length <=30){
                        valid = true;
                    }
                    return valid
                },
                isValid: true, 
                errorMessage: "Name must be up to 3 letters",
                touched: false,
                iconName:"person"
            },
            email: {
                elemType: "input",
                config: {
                    type: 'text', 
                    placeholder: "Email"
                },
                value: '',
                validation: function(){
                    let valid = false;
                    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    if(emailRegex.test(this.value)){
                        valid = true
                    }
                    return valid
                },
                isValid: true,
                errorMessage: "Please input a valid email address",
                touched: false, 
                iconName: "mail"
            },
            role: {
                elemType: "select", 
                config: {
                    options:[
                        {value:'user', displayValue:"User"},
                        {value:'admin', displayValue:"Admin"}
                    ]
                },
                validation: function(){
                    return true
                },
                value: '',
                isValid:true
            },
            password: {
                elemType: "input", 
                config: {
                    type: 'password', 
                    placeholder: "password"
                },
                value:"",
                validation: function(){
                    let valid = false;
                    if(this.value.trim() !== '' && this.value.length >=5 && this.value.length <=30){
                        valid = true;
                    }
                    return valid
                },
                isValid: true,
                errorMessage: "Add a strong passkey whose length is not less than 5",
                touched: false,
                iconName: "key"
            }
        }
    }
    formElementChangeHandler = async (event, elemName)=> {
        let formInputs = {...this.state.formInputs}
        let element = formInputs[elemName]
        element.value= event.target.value;
        element.isValid = element.validation()
        element.touched = true;
        await this.setState({formInputs: formInputs})
        await this.checkValidity()
    }
    checkValidity = async()=>{
        let  theFormIsValid = true;
        for(let elemName in this.state.formInputs){
            if(this.state.formInputs[elemName].isValid === false){
                console.log(this.state.formInputs[elemName])
                theFormIsValid = false;
                break;
            }
        }
        await this.setState({isFormValid: theFormIsValid})
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.userDetails !== this.props.userDetails){
            const initialFormInput = {...prevState.formInputs}
            initialFormInput.name.value = this.props.userDetails.name;
            initialFormInput.email.value = this.props.userDetails.email;
            initialFormInput.role.value = this.props.userDetails.role;
            initialFormInput.password.value = ''
            for(let elemName in initialFormInput){
                initialFormInput[elemName].touched = false
            }
            this.setState({formInputs: initialFormInput});
        }
    }
    editSubmitHandler = async(event) => {
        let data  = {}
        event.preventDefault();
        await this.setState({isSubmited: true});
        if(this.state.isSubmited && this.state.isFormValid){
            for(let key in this.state.formInputs){
                const deKey= key;
                data[deKey]= this.state.formInputs[deKey].value
            }
            await this.setState({loading: true})
            Axios.put('/api/user/edit-user/'+this.props.userDetails._id, data, {
                headers: {
                    'x-access-token': this.props.token
                }, 
                data:data
            })
            .then(response => {
                this.setState({loading: false, serverError: false})
                this.props.cancel()
            }).catch(error => {
                this.setState({loading: false})
                if(error.response){
                    this.setState({invalidFormErrorMessage: error.response.data.message, isFormValid:false})
                }else{
                    this.setState({invalidFormErrorMessage: "There was a server error, try later", isFormValid:false})
                }
            })
        }
    }
    
    render(){
        let formElements = [];
        for(let elementName in this.state.formInputs){
            formElements.push({
                id: elementName, 
                config: this.state.formInputs[elementName]
            })
        }
        let isClicked = this.props.isClicked;
    
        let classes = ["EditUserFormWrapper"]
        if(isClicked){
            classes.push('ShowEditUser')
        }else{
            classes.push('hideUserEditForm')
        }
        let subMitErrorClass = ["ErrorMessage"]
        if(this.state.isSubmited && !this.state.isFormValid || this.state.serverError){
            subMitErrorClass.push("Show__Error")
        }else{
            subMitErrorClass.push("Hide__Error")
        }
        let toDisplay =  (
            <button disabled={!this.state.isFormValid}>Submit</button>
        )
        if(this.state.loading){
            toDisplay = <Spinner />
        }
        let display 
        if(!this.props.userDetails && this.props.isClicked){
            display = <Spinner />
        }else{ 
            display = 
            <div className={classes.join(" ")}>
                <div className="EditUser">
                    <div className="CancelButton" onClick={this.props.cancel}>
                        <button>Cancel</button>
                    </div>
                    
                    <h1>Edit the user</h1>
                    <p className={subMitErrorClass.join(" ")}>{this.state.invalidFormErrorMessage} </p>
                    <form onSubmit={this.editSubmitHandler}>
                        {formElements.map(element => (
                            <InputWithIcon 
                            key={element.id}
                            elemType={element.config.elemType}
                            config={element.config.config}
                            value={element.config.value}
                            iconName={element.config.iconName}
                            errorMessage={element.config.errorMessage}
                            changed={(event)=>this.formElementChangeHandler(event, element.id)}
                            valid={element.config.isValid}
                            touched={element.config.touched}
                            />)
                        )}
                        <div className="Submit__Wrapper">
                            {toDisplay}
                        </div>
                    </form>
                </div>
            </div>
        }
        return(
            <Aux>
                <Backdrop toggled={isClicked} clicked={this.props.clicked}/>
                {display}
            </Aux>
        )
    }
}
const propsMappedToState = (state)=> {
    return{
        token : state.userData.token
    }
}

export default connect(propsMappedToState) (EditForm)