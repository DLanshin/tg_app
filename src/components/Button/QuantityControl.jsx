import React from 'react';
import Button from "./Button";
import {icons} from "../icons";

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
            <Button onClick={()=>{decrement()}} className={"quality-control__button"}>{icons.minus}</Button>
            <span className={"quality-control__value"}>{props.count}</span>
            <Button onClick={()=>{increment()}} className={"quality-control__button"}>{icons.plus}</Button>
        </div>
    );
};

export default QuantityControl;