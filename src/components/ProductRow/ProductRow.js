import React from 'react'
import Aux from '../../hoc/Aux'
import Product from '../ProductLayers/ProductLayer/ProductLayer'
import * as  actionCreator from '../../Store/actions'
import './ProductRow.css'
import { connect } from 'react-redux'

const productRow = (props) => {
    const baseUrl = "https://suneng-working-project.herokuapp.com/machines/"
    const onOrder = (name) => {
        const product = props.products.find(elem => elem.name == name)
        props.setPreOrdered(product)
    }
    const toDisplay = props.rowProduct.map(element => (
        <Product
        additioClass="prod__Products"
        source={baseUrl +element.machineSource}
        key={element._id}
        details={element.details}
        name={element.name}
        preOrdered={()=>onOrder(element.name)}
        showOrder={props.showOrder}
        />
    ))
    return (
        <Aux>
            <div className="productRow">
                {toDisplay}
            </div>
        </Aux>
    )
}

const propsMappedToState = (state) => {
    return {
        products : state.products, 
    }
}
const action = (dispatch) => {
    return {
        getMyProducts : (payload) => dispatch(actionCreator.companyProduct(payload)),
        setPreOrdered: (payload) => dispatch(actionCreator.setPreOrdered(payload))
    }
}
export default connect(propsMappedToState, action)(productRow)