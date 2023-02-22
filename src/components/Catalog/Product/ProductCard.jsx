import React from 'react';
import Button from "../../Button/Button";
import {
    addProductAction,
    incrementQualityAction
} from "../../../store/reducers/cart/cart-reducer";
import {useDispatch, useSelector} from "react-redux";

const ProductCard = (props) => {
    const dispatch = useDispatch();
    const addProduct = (product) => {
        dispatch(addProductAction(product))
    }
    return (
        <div className={"product__item"} data-id={props.product.id}>
            <div className="product__item-content">
                <img className={"product__item-image"} src={props.product.thumbnail} alt={props.product.title}/>
                <div className="product__item-name">{props.product.title}</div>
                <div className="product__item-description">{props.product.description}</div>
            </div>
            <div className="product__item-footer">
                <Button onClick={() => {addProduct(props.product)}} className={'product__item-button '}>
                        {props.product.price + ' ₽'}
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;