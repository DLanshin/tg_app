import React from 'react';
import Button from "./Button";

const QuantityControl = (props) => {
    const decrement = () =>{
        if(typeof props.decrementAction !== "undefined"){
            props.decrementAction()
        }
    }
    const increment = () => {
        if(typeof props.incrementAction !== "undefined") {
            props.incrementAction()
        }
    }
    return (
        <div className={"quality-control"}>
            <Button onClick={()=>{decrement()}} className={"quality-control__button"}>-</Button>
            <span className={"quality-control__value"}>{props.count}</span>
            <Button onClick={()=>{increment()}} className={"quality-control__button"}>+</Button>
        </div>
    );
};

export default QuantityControl;