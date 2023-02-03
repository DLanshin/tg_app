import React from 'react';

const Button = (props) => {
    return (
        <button {...props} className={'button '+props.classname }/>
    );
};

export default Button;