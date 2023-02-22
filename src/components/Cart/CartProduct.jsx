import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import QuantityControl from "../Button/QuantityControl";
import Button from "../Button/Button";
import {decrementQualityAction, incrementQualityAction} from "../../store/reducers/cart/cart-reducer";

const CartProduct = ({product}) => {
    const dispatch = useDispatch();
    const incrementProductQuality = (product) => {
        dispatch(incrementQualityAction(product));
    }
    const decrementProductQuality = (product) => {
        dispatch(decrementQualityAction(product));
    }
    return (
        <div className={"cart__item"} data-id={product.id}>
            <img className={"cart__item-image"} src={product.thumbnail} alt={product.title}/>
            <div className="cart__item-content">
                <div className="cart__item-name">{product.title}</div>
                <QuantityControl
                    count={product.count}
                    incrementAction={()=>{incrementProductQuality(product)}}
                    decrementAction={()=>{decrementProductQuality(product)}}
                />
            </div>
            <div className="cart__item-price">
                {product.totalPrice ? product.totalPrice + ' ₽' : product.price + ' ₽'}
            </div>
        </div>
    );
};

export default CartProduct;