import React, {Component} from 'react'
import './EditProduct.css'
import Aux from '../../../../hoc/Aux'
import Axios from '../../../../Axios'
import Input from '../../../../components/UI/Input/Input'
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Backdrop from '../../../../components/UI/Backdrop/Backdrop';
import { generateBase64FromImage, convertUriToFile } from '../../../../Util/image';
import FilePicker from '../../../../components/UI/FilePicker/FilePicker'
import { connect } from 'react-redux'


class EditProduct extends Component{
    state = {
        isFormValid: true,
        isSubmited: false,
        loading: false,
        serverError: false,
        invalidFormErrorMessage:"Please, fill the forms accurately before you submit",
        file:null,
        initialSource: 'https://suneng-backend.herokuapp.com/api/machines/',
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
                isValid: true, 
                errorMessage: "Name must be up to 3 letters",
                touched: false,
            },
            details: {
                elemType: "textarea",
                config: {
                    rows: "5", 
                    cols: "40", 
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
                isValid: true,
                errorMessage: "Details must be of length greater than 10 but less than 400",
                touched: false, 
                iconName: "mail"
            },
        },
        imagePreview: null,
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.prodDetails !== this.props.prodDetails){
            const initialFormInput = {...prevState.formInputs}
            initialFormInput.name.value = this.props.prodDetails.name;
            initialFormInput.details.value = this.props.prodDetails.details;
            for(let elemName in initialFormInput){
                initialFormInput[elemName].touched = false
            }
            this.setState({formInputs: initialFormInput, file: this.props.prodDetails.machineSource});
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
    fileChangeHandler = (e)=>{
        generateBase64FromImage(e.target.files[0])
        .then(b64 => {
            this.setState({imagePreview:b64})
        })
        this.setState({file:e.target.files[0]})
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
        const verifyPassword = {...this.state.verifyPassword}
        verifyPassword.value = ''
        this.setState({formInputs: initialField, verifyPassword: verifyPassword})
    }
    editSubmitHandler = async (event)=>{
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
            Axios.put('/api/product/edit-product/' + this.props.prodDetails._id, formData, {
                headers: {
                    'x-access-token': this.props.token, 
                    'content-type':'multipart/form-data'
                }
            })
            .then(response => {
                console.log(response)
                this.setState({loading: false, serverError: false})
                this.clearFields()
                this.props.cancel()
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
        let isClicked = this.props.isClicked;
    
        let classes = ["EditProductFormWrapper"]
        if(isClicked){
            classes.push('ShowEditProduct')
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
        let imageUrl = this.props.prodDetails ? this.state.initialSource + this.props.prodDetails.machineSource : "";
        if(this.state.imagePreview){
            imageUrl = this.state.imagePreview
        }
        let alt = this.props.prodDetails? this.props.prodDetails.name: ""

        let display 
        if(!this.props.prodDetails && this.props.isClicked){
            display = <Spinner />
        }else{ 
            display = 
            <div className={classes.join(" ")}>
                <div className="EditProduct">
                    <div className="CancelButton" onClick={this.props.cancel}>
                        <button>Cancel</button>
                    </div>
                    
                    <h1>Edit the Product</h1>
                    <div className="Edit_Image_Container">
                        <img src={imageUrl} alt={alt} />
                    </div>
                    <FilePicker
                    changed={this.fileChangeHandler}
                    />
                    <p className={subMitErrorClass.join(" ")}>{this.state.invalidFormErrorMessage} </p>
                    <form onSubmit={this.editSubmitHandler} enctype="multipart/form-data">
                        {formElements.map(element => (
                            <Input
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
        return (
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

export default connect(propsMappedToState) (EditProduct)