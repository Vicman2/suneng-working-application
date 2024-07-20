

import React, {Component} from 'react'
import ContactDetails from '../../components/ContactDetails/ContactDetails';
import Input from '../../components/UI/Input/Input'
import Aux from '../../hoc/Aux'
import './Contact.css'
import axios from '../../Axios'
import Spinner from '../../components/UI/Spinner/Spinner';
import SuccessMessage from '../../components/SuccessMessage/SuccessMessage';

class Contact extends Component{
    state = {
        successfulSubmisson:false,
        isFormValid: false,
        isSubmitted: false,
        formInputs: {
            name: {
                elemType: "input",
                config: {
                    type: 'text', 
                    placeholder: "Name"
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
                touched: false
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
                touched: false
            },
            phone: {
                elemType: "input", 
                config: {
                    type: 'text', 
                    placeholder: "Phone Number"
                },
                value:"",
                validation: function(){
                    let valid = false;
                    const regEx = /^0[789][01]\d{8}$/
                    if(regEx.test(this.value.trim())){
                        valid = true
                    }
                    return valid
                },
                isValid: false,
                errorMessage: "Input a valid phone number",
                touched: false
            },
            subject: {
                elemType: "textarea", 
                config: {
                    type: 'text', 
                    placeholder: "How can we help you ?",
                    rows:13,
                    cols:35
                },
                value:"",
                validation : function(){
                    let valid = false;
                    if(this.value.trim() !== '' && this.value.trim().length >=15){
                        valid = true;
                    }
                    return valid;
                },
                isValid: false,
                errorMessage: "Please add a nice message", 
                touched: false
            }
        }
    }
    elementValidationHandler =(event, InputElement)=> {
        const updatedFormOrder = {...this.state.formInputs}
        const UpdatedFormElement = {...updatedFormOrder[InputElement] }
        UpdatedFormElement.value = event.target.value;
        UpdatedFormElement.touched = true;
        UpdatedFormElement.isValid = UpdatedFormElement.validation();
        updatedFormOrder[InputElement] = UpdatedFormElement;
        this.setState({formInputs: updatedFormOrder});
        this.checkValidity();
    }
    checkValidity = ()=>{
        let  theFormIsValid = true;
        for(let elemName in this.state.formInputs){
            if(this.state.formInputs[elemName].isValid === false){
                theFormIsValid = false;
                break;
            }
        }
        this.setState({isFormValid: theFormIsValid})
    }
    clearField = ()=> {
        let validaity = {...this.state.formInputs}
        for(let elem in validaity){
            validaity[elem].value = ""
        }
        this.setState({formInputs: validaity})
    }
    submitFormHandler = (event) => {
        event.preventDefault()
        this.setState({isSubmitted:true})
        const data = {}
        for(let key in this.state.formInputs){
            const keyPer = key
            data[keyPer] = this.state.formInputs[key].value
        }
        axios.post('/api/user/contact', data)
        .then(response => {
            this.setState({isSubmitted: false,successfulSubmisson: true})
            this.clearField()
        })
        .catch(err=> {
            this.setState({isSubmitted: false, isFormValid:false})
            console.log(err)
        })
    }
    render(){
        let formElements = [];
        for(let elementName in this.state.formInputs){
            formElements.push({
                id: elementName,
                config: this.state.formInputs[elementName]
            })
        }
        let toDisplay
        if(this.state.isSubmitted){
            toDisplay = <Spinner />
        }else{
            toDisplay = 
            <div className="Btn__Div">
                <button className="SubmitButton" 
                disabled={!this.state.isFormValid}
                onClick={this.submitFormHandler}
                >Submit</button>
            </div>
        }
        let totalDisplay;
        if(this.state.successfulSubmisson){
            totalDisplay = <SuccessMessage
             message="Your request have been recieved. We will get back to you as soon as possible"
             />
        }else{
            totalDisplay =<form>
            {formElements.map(element => (
                <Input  
                key={element.id}
                elemType={element.config.elemType} 
                config={element.config.config}
                errorMessage={element.config.errorMessage}
                valid={element.config.isValid}
                touched={element.config.touched}
                value={element.config.value}
                changed={(event)=>this.elementValidationHandler(event, element.id)}/>
            ))}
            {toDisplay}
        </form>
        }
        return (
            <Aux>
                <div className="Contact" id="Contacting__Us">
                    <p className="Contact__Header">Contact Us</p>
                    <div className="Contact__Wrapper">
                        <div>
                            <ContactDetails />
                        </div>
                        <div className="Form__Div">
                            {totalDisplay}
                        </div>
                    </div>
                </div>

            </Aux>
        )
    }
}

export default Contact