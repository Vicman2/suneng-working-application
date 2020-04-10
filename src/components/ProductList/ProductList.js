import React from 'react'
import './ProductList.css'
import Aux from '../../hoc/Aux'

const ProductList = (props) => {
    const initialSource = 'http://localhost:2020/api/machines/';
    const encodeSource = initialSource+ props.source
    return (
        <Aux>
            <div className="ProductList">
                <p className="Product_Name">{props.name} </p>
                <p className="Product_Details">{props.details} </p>
                <p className="Product_Image"> <img src={encodeSource} alt={props.name}/> </p>
                <p className="Operation_Icons sub_Operations">
                    <div className="trash-icon"><ion-icon onClick={props.deleteProduct} name="trash"></ion-icon></div>
                    <div className="edit-icon"><ion-icon onClick={props.editProduct} name="create"></ion-icon></div>
                </p>
            </div>
        </Aux>
    )
}

export default ProductList 