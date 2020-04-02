import React, {Component} from 'react'
import {connect} from 'react-redux'
import Backdrop from '../../../components/UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux'
import InputWithIcon from '../../../components/UI/InputWithIcon/InputWithIcon'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Axios from '../../../Axios'
import * as actionCreator from '../../../Store/actions'
import './Login.css'


class Login extends Component{
    state = {
        isLoggedIn: false,
        isFormValid: false,
        isSubmited : false,
        serverError: false, 
        loading: false,
        formErrorMessage: "Please fill in the form accurately before you submit",
        formInputs: {
            email: {
                elemType: "input",
                config: {
                    type: 'text', 
                    placeholder: "Email" 
                },
                iconName: "mail",
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
                touched: false
            },
            password: {
                elemType: "input", 
                config: {
                    type: 'password', 
                    placeholder: "password"
                },
                value:"",
                iconName:"key",
                validation: function(){
                    return true;
                },
                isValid: false,
                errorMessage: "",
                touched: false
            }
        }
    }
    formChangeHandler = async (event, elemName) => {
        let formInputs = {...this.state.formInputs}
        formInputs[elemName].value = event.target.value;
        formInputs[elemName].isValid = formInputs[elemName].validation();
        formInputs[elemName].touched = true
        await this.setState({formInputs: formInputs})
        await this.checkValidity()
    }
    formSubmitHandler = async (event)=>{
        event.preventDefault();
        let data  = {}
        await this.setState({isSubmited: true});
        console.log(this.state.isFormValid)
        if(this.state.isSubmited && this.state.isFormValid){
            for(let key in this.state.formInputs){
                const deKey= key;
                data[deKey]= this.state.formInputs[deKey].value;
            }
            await this.setState({loading: true})
            
            Axios.post('/api/user/login', data)
            .then(response => {
                this.setState({loading: false, serverError: false})
                this.props.onLogin(response.data.details)
                this.props.clicked();
                this.clearFields()
                localStorage.setItem('sunengUserData', JSON.stringify(response.data.details))
            })
            .catch(error => {
                this.setState({loading: false})
                console.log(error.response)
                if(error.response){
                    this.setState({formErrorMessage: error.response.data.message, isFormValid:false})
                }else{
                    this.setState({formErrorMessage: "There was a server error, try later", isFormValid:false})
                }
            })
        }
    }
    checkValidity = async()=>{
        let  theFormIsValid = true;
        for(let elemName in this.state.formInputs){
            if(this.state.formInputs[elemName].isValid === false){
                theFormIsValid = false;
                break;
            }
        }
        await this.setState({isFormValid: theFormIsValid})
    }
    clearFields = ()=>{
        const initialField = {...this.state.formInputs}
        for(let elemName in initialField){
            initialField[elemName].value = '';
        }
        this.setState({formInputs: initialField})
    }
    render(){
        let formInputs = []
        for(let elemName in this.state.formInputs){
            formInputs.push({
                id: elemName, 
                config: this.state.formInputs[elemName]
            })
        }
        let isClicked = this.props.showUp
        let classes = ["LoginWrapper"]
        if(isClicked){
            classes.push('showLogin')
        }else{
            classes.push('hidden')
        }
        let subMitErrorClass = ["ErrorMessage"]
        if(this.state.isSubmited && !this.state.isFormValid || this.state.serverError){
            subMitErrorClass.push("Show__Error");
        }else{
            subMitErrorClass.push("Hide__Error")
        }
        let toDisplay =  (
            <input type="submit" value="Submit"/>
        )
        if(this.state.loading){
            toDisplay = <Spinner />
        }
        return(
            <Aux>
                <Backdrop toggled={isClicked} clicked={this.props.clicked}/>
                <div className={classes.join(" ")}>
                    <div className="Login">
                        <div className="CancelButton" onClick={this.props.clicked}>
                           <button>Cancel</button>
                        </div>
                        
                        <h1>Login to your account</h1>
                        <p className={subMitErrorClass.join(" ")}>{this.state.formErrorMessage} </p>
                        <form onSubmit={this.formSubmitHandler}>
                            {formInputs.map(elem => (
                                <InputWithIcon
                                key={elem.id}
                                elemType={elem.config.elemType} 
                                value={elem.config.value}
                                config={elem.config.config}
                                iconName={elem.config.iconName}
                                touched={elem.config.touched}
                                valid={elem.config.isValid}
                                errorMessage={elem.config.errorMessage}
                                changed={(event)=>this.formChangeHandler(event, elem.id)}/>)
                            )}
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

const mapDispatchToComponent = dispatch =>{
    return {
        onLogin: (payload) => dispatch(actionCreator.login(payload))
    }
}

export default connect(null, mapDispatchToComponent)(Login)