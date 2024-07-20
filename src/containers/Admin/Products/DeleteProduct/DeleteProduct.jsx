import React, {Component} from 'react'
import { connect } from 'react-redux'
import './DeleteProduct.css'
import Aux from '../../../../hoc/Aux'
import Axios from '../../../../Axios'
import Spinner from '../../../../components/UI/Spinner/Spinner'
import Backdrop from '../../../../components/UI/Backdrop/Backdrop'



class DeleteProduct extends Component{
    state = {
        detailOfProduct :{
            _id:'',
            name:'',
            details:'',
            machineSource:'',
        },
        initialSource: 'https://suneng-backend.herokuapp.com/api/machines/'
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.prodDetails !== this.props.prodDetails){
            this.setState({detailOfProduct: this.props.prodDetails})
        }
    }
    deleteTheProduct = async()=>{
        const productId = this.props.prodDetails._id
        Axios.delete('/api/product/delete-product/' + productId, {
            headers: {
                'x-access-token': this.props.token
            }
        })
        .then(response => {
            this.props.cancel()
        })
        .catch(err=> {
            console.log(err)
        })
    }
    render(){
        let isClicked = this.props.isClicked;
    
        let classes = ["DeleteProductWrapper"]
        if(isClicked){
            classes.push('ShowDeleteProduct')
        }else{
            classes.push('hideDeleteProduct')
        }
        let toDisplay
        let imageUrl 
        let alt 
        if(this.props.prodDetails){
            imageUrl= this.state.initialSource + this.props.prodDetails.machineSource
            alt = this.props.prodDetails.name

        }else{
            imageUrl =''
        }

        if(this.props.isClicked && !this.props.prodDetails){
            toDisplay = <Spinner />
        }else{
            toDisplay = <Aux>
                <div className={classes.join(" ")}>
                    <div className="DeleteProduct">
                        <strong className="DeleteQuestion">Do you really want to delete this product ?</strong>
                        <div className="product_Image_toDelete">
                            <img src={imageUrl} alt={alt} />
                        </div>
                        <div className="Field_Column">
                            <p className="UserFields">Id:</p>
                            <p className="FieldValue">{this.state.detailOfProduct._id}</p>
                        </div>
                        <div className="Field_Column">
                            <p className="UserFields">Name:</p>
                            <p className="FieldValue">{this.state.detailOfProduct.name}</p>
                        </div>
                        <div className="Field_Column">
                            <p className="UserFields">Machine Source:</p>
                            <p className="FieldValue">{this.state.detailOfProduct.machineSource}</p>
                        </div>
                        <div className="Field_Column">
                            <p className="UserFields">Details:</p>
                            <p className="FieldValue DetailsValue">{this.state.detailOfProduct.details}</p>
                        </div>
                        <div>
                            <div className="delete_Commands">
                                <p className="cancel_delete_command" onClick={this.props.cancel}>Cancel</p>
                                <p className="continue_delete_command" onClick={this.deleteTheProduct}>Continue</p>
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

export default connect(propsMappedToState)(DeleteProduct)