import React from 'react'

function InputText(props) {
    return (
        <input
            type="text"
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.handleChange}
        />
    )
};


export default InputText
