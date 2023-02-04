import React from 'react';
import Button from "../Button/Button";


const ProductCard = (props) => {
    let showPanel = false;
    const add2Cart = () => {
        showPanel = true;
        console.log("Add to cart");
    }
    return (
        <div className={"product__item"} data-id={props.product.id}>
            <div className="product__item-content">
                <img class={"product__item-image"} src={props.product.image} alt={props.product.name}/>
                <div className="product__item-name">{props.product.name}</div>
                <div className="product__item-description">{props.product.description}</div>
            </div>
            <div className="product__item-footer">
                <Button onClick={add2Cart} className={'product__item-button '+ (showPanel ? "hide": "")}>
                        {props.product.price + ' ₽'}
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;