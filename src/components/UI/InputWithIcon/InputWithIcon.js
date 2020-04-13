import React from 'react'
import Aux from '../../../hoc/Aux'
import './InputWithIcon.css'

const inputWithIcon = (props) => {
    let inputElement = null;
    let classes = null
    if(!props.valid && props.touched){
        classes = "ShowErrorMessage"
    }else{
        classes ="HideErrorMessage"
    }
    switch(props.elemType){
        case('input'):
        inputElement =(
            <Aux>
                <div className="inputWithIcon">
                    <input
                    onChange={props.changed} 
                    {...props.config}
                    value={props.value}
                    onChange={props.changed}/>
                    <ion-icon name={props.iconName}></ion-icon>
                    <div className={classes}>{props.errorMessage}</div>
                </div>
            </Aux>
        ) 
        break;
        case('textarea'):
        inputElement = (
            <Aux>
                <textarea  
                className="Input__Element"  
                onChange={props.changed} 
                {...props.config}
                 value={props.value}>
                </textarea>
                <div className={classes}>{props.errorMessage}</div>
            </Aux>
        )
        break;
        case('select'):
        inputElement = (
            <Aux>
                <select 
                    className="Input__Element"  
                    onChange={props.changed} 
                    value={props.value}>
                    {props.config.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            </Aux>
        )
        break;
        default: 
        inputElement = (
            <Aux>
                <input 
                className="Input__Element" 
                onChange={props.changed} {...props.config}
                value={props.value} />
                <div>{props.errorMessage} </div>
            </Aux>
        )
    }
    return (
        <div className="Input">
            <label> {props.label} </label>
            {inputElement}
        </div>
    )
}

export default inputWithIcon