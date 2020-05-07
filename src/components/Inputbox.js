import React from 'react'
import './Inputbox.scss'

const Inputbox = (props) => {
    return (
        <div className="inputbox">
            <span className="input__field">
                <p className="fieldName">{props.name}</p>
                <input 
                    type="text" 
                    name={props.name} 
                    value={props.value} 
                    onChange={(e) => props.onChange(e, props.name)}
                    placeholder={props.placeHolder}
                />
            </span>
        </div>
    )
}

export default Inputbox