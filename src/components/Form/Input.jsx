import React from "react";

const Input = ({ label, name, required, type, placeholder, value, onChange}) => {
    return (
        <div className={"input-container"}>
            {label ? <label>{label}</label> : ""}
            <input
                name={name}
                required={required}
                className={"input"}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e)=>onChange(e.target.value)}
            />
        </div>
    );
};

export default Input;