import React, {Component} from 'react'
import Axios from '../../../../Axios'
import './AddForm.css'
import Aux from '../../../../hoc/Aux'
import Spinner from '../../../../components/UI/Spinner/Spinner'
import InputWithIcon from '../../../../components/UI/InputWithIcon/InputWithIcon'
import Backdrop from '../../../../components/UI/Backdrop/Backdrop'

class AddForm extends Component{
    state = {
        isFormValid: false,
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
                value:"",
                validation: function(){
                    let valid = false;
                    if(this.value.trim() !== '' && this.value.length >=3 && this.value.length <=30){
                        valid = true;
                    }
                    return valid
                },
                isValid: false, 
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
                value:"",
                validation: function(){
                    let valid = false;
                    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    if(emailRegex.test(this.value)){
                        valid = true
                    }
                    return valid
                },
                isValid: false,
                errorMessage: "Please input a valid email address",
                touched: false, 
                iconName: "mail"
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
                isValid: false,
                errorMessage: "Add a strong passkey whose length is not less than 5",
                touched: false,
                iconName: "key"
            }
        },
        verifyPassword: {
            elemType: "input", 
            config: {
                type: 'password', 
                placeholder: "Verify password",
                rows:13,
                cols:35
            },
            value:"",
            isValid: false,
            errorMessage: "Password do not match", 
            touched: false,
            iconName: "key"
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
    verifyPasswordHandler= async(event)=> {
        let password = this.state.formInputs.password.value;
        let verifyPassword = {...this.state.verifyPassword}
        verifyPassword.value = event.target.value
        verifyPassword.touched= true;
        verifyPassword.isValid = password === verifyPassword.value ? true: false;
        await this.setState({verifyPassword:verifyPassword});
        await this.checkValidity()
    }
    checkValidity = async()=>{
        let  theFormIsValid = true;
        for(let elemName in this.state.formInputs){
            if(this.state.formInputs[elemName].isValid === false){
                theFormIsValid = false;
                break;
            }
        }
        theFormIsValid = this.state.verifyPassword.isValid && theFormIsValid ? true: false
        await this.setState({isFormValid: theFormIsValid})
    }
    clearFields = ()=>{
        const initialField = {...this.state.formInputs}
        for(let elemName in initialField){
            initialField[elemName].value = '';
        }
        const verifyPassword = {...this.state.verifyPassword}
        verifyPassword.value = ''
        this.setState({formInputs: initialField, verifyPassword: verifyPassword})
    }
    formSubmitHandler = async (event)=>{
        let data  = {}
        event.preventDefault();
        await this.setState({isSubmited: true});
        if(this.state.isSubmited && this.state.isFormValid){
            for(let key in this.state.formInputs){
                const deKey= key;
                data[deKey]= this.state.formInputs[deKey].value
            }
            await this.setState({loading: true})
            Axios.post('/api/user/signup', data)
            .then(response => {
                this.setState({loading: false, serverError: false})
                this.props.clicked()
                this.props.getUsers(1)
                this.clearFields()
            })
            .catch(error => {
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
        let isClicked = this.props.showUp;

        let classes = ["AddUserFormWrapper"]
        if(isClicked){
            classes.push('ShowAddUser')
        }else{
            classes.push('hideUserAddForm')
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
        return(
            <Aux>
                <Backdrop toggled={isClicked} clicked={this.props.clicked}/>
                <div className={classes.join(" ")}>
                    <div className="AddUser">
                        <div className="CancelButton" onClick={this.props.clicked}>
                            <button>Cancel</button>
                        </div>
                        
                        <h1>Add a user</h1>
                        <p className={subMitErrorClass.join(" ")}>{this.state.invalidFormErrorMessage} </p>
                        <form onSubmit={this.formSubmitHandler}>
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
                            <InputWithIcon 
                            elemType={this.state.verifyPassword.elemType}
                            config={this.state.verifyPassword.config}
                            value={this.state.verifyPassword.value}
                            iconName={this.state.verifyPassword.iconName}
                            errorMessage={this.state.verifyPassword.errorMessage}
                            changed = {(event)=>this.verifyPasswordHandler(event)}
                            valid={this.state.verifyPassword.isValid}
                            touched={this.state.verifyPassword.touched}
                            />
                             <div className="Submit__Wrapper">
                                {toDisplay}
                             </div>
                        </form>
                    </div>
                </div>
            </Aux>
        )
    }
}

export default AddForm