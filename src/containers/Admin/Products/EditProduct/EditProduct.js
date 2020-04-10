import React, {Component} from 'react'
import './EditProduct.css'
import Aux from '../../../../hoc/Aux'


class EditProduct extends Component{
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
    render(){
        return (
            <Aux>

            </Aux>
        )
    }
}

export default EditProduct