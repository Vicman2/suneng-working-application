import React, {Component} from 'react'
import Backdrop from '../../../components/UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux'
import InputWithIcon from '../../../components/UI/InputWithIcon/InputWithIcon'
import './Login.css'


class Login extends Component{
    state = {
        isLoggedIn: false,
        isFormValid: false,
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
                    let valid = false;
                    //Write the validation function here
                },
                isValid: false,
                errorMessage: "Add a strong passkey",
                touched: false
            }
        }
    }
    formChangeHandler = (event, elemName) => {
        let formInputs = {...this.state.formInputs}
        formInputs[elemName].value = event.target.value;
        this.setState({formInputs: formInputs})
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
        return(
            <Aux>
                <Backdrop toggled={this.props.showUp} clicked={this.props.clicked}/>
                <div className={classes.join(" ")}>
                    <div className="Login">
                        <div className="CancelButton" onClick={this.props.clicked}>
                           <button>Cancel</button>
                        </div>
                        
                        <h1>Login to your account</h1>
                        <form>
                            {formInputs.map(elem => (
                                <InputWithIcon 
                                key={elem.id}
                                elemType={elem.config.elemType} 
                                value={elem.config.value}
                                config={elem.config.config}
                                iconName={elem.config.iconName}
                                changed={(event)=>this.formChangeHandler(event, elem.id)}/>)
                            )}
                            <div className="Submit__Wrapper">
                                <input type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </Aux>
        )
    }
}

export default Login