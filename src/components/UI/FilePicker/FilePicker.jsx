import React from 'react'
import './FilePicker.css'
import Aux from '../../../hoc/Aux'

const FilePicker = (props)=>{
    return (
        <Aux>
            <div className="FilePicker">
                <input type="file" onChange={props.changed}/>
            </div>
        </Aux>
    )
}

export default FilePicker