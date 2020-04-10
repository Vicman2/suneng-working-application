import React, {Component} from 'react'
import './AddProduct.css'
import Aux from '../../../../hoc/Aux'
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Backdrop from '../../../../components/UI/Backdrop/Backdrop';
import Axios from '../../../../Axios'
import InputWithIcon from '../../../../components/UI/InputWithIcon/InputWithIcon';
import { connect } from 'react-redux';


class AddProduct extends Component{
    state = {
        isFormValid: false,
        isSubmited: false,
        loading: false,
        serverError: false,
        invalidFormErrorMessage:"Please, fill the forms accurately before you submit",
        file:null,
        formInputs: {
            name: {
                elemType: "input", 
                config: {
                    type: 'text', 
                    placeholder: "Product Name"
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
            },
            details: {
                elemType: "textarea",
                config: {
                    rows: "10", 
                    cols: "45", 
                    placeholder: "Details in not more than 400 words"
                },
                value:"",
                validation: function(){
                    let valid = false;
                    if(this.value.trim() !== '' && this.value.length >=30 && this.value.length <=400){
                        valid = true;
                    }
                    return valid
                },
                isValid: false,
                errorMessage: "Details must be of length greater than 10 but less than 400",
                touched: false, 
                iconName: "mail"
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
                theFormIsValid = false;
                break;
            }
        }
        await this.setState({isFormValid: theFormIsValid})
    }
    fileChangeHandler = (e)=>{
        this.setState({file:e.target.files[0]})
    }
    fileUploadHandler
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
        event.preventDefault();
        let data  = {}
        await this.setState({isSubmited: true});
        if(this.state.isSubmited && this.state.isFormValid){
            for(let key in this.state.formInputs){
                const deKey= key;
                data[deKey]= this.state.formInputs[deKey].value
            }
            const formData = new FormData()
            for(const key in data){
                formData.append(key, data[key])
            }
            formData.append('prodImage', this.state.file)
            
            await this.setState({loading: true})
            Axios.post('/api/product/add-product', formData, {
                headers: {
                    'x-access-token': this.props.token, 
                    'content-type':'multipart/form-data'
                }
            })
            .then(response => {
                this.setState({loading: false, serverError: false})
                this.props.clicked()
                this.props.getProducts()
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
            <input type="submit" value="Submit"/>
        )
        if(this.state.loading){
            toDisplay = <Spinner />
        }
        return(
            <Aux>
                <Backdrop toggled={isClicked} clicked={isClicked}/>
                <div className={classes.join(" ")}>
                    <div className="AddUser">
                        <div className="CancelButton" onClick={this.props.clicked}>
                            <button>Cancel</button>
                        </div>
                        
                        <p className={subMitErrorClass.join(" ")}>{this.state.invalidFormErrorMessage} </p>
                        <form onSubmit={this.formSubmitHandler} enctype="multipart/form-data">
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
                            <input type="file" onChange={this.fileChangeHandler}/>
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
const propsMappedToState = (state)=> {
    return{
        token : state.userData.token
    }
}

export default connect(propsMappedToState) (AddProduct)