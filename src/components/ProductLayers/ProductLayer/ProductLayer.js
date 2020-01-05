import React from 'react';
import Aux from '../../../hoc/Aux'
import './ProductLayer.css'


const productLayer = (props) => {
    let classes = ["prod"];
    if(props.additioClass){
        classes.push(props.additioClass)
    }
    return (
        <Aux>
            <section className={classes.join(" ")}>
                <div className="imageContainer">
                    <img src={props.source} alt="" />
                </div>
                <div className="Product__Detail">
                <p className="Machine__name"> {props.name} </p>
                <p className="Machine__Details"> {props.details} </p>
                    <div className="Btn__Div">
                        <section className="order__Section">
                            <button onClick={props.preOrdered}>Order</button>
                        </section>
                    </div>
                </div>
            </section>
            
        </Aux> 
    )
}

export  default productLayer