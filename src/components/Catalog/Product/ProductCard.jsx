import React from 'react';
import {NavLink} from "react-router-dom";
import {PRODUCT_ROUTE} from "../../../utils/consts";
import {icons} from "../../icons";
import cart from "../../../store/cart/CartStore";
import {observer} from "mobx-react-lite";

const ProductCard = observer(({product}) => {
    const cartProducts = cart.products
    let inCart = false,
        cartQuality = 0;

    const skusInCartIds = cartProducts.map(function (item){
        return item.sku_id;
    });

    product.skus.map(function (item){
        if(skusInCartIds.includes(item.id)){
            inCart = true
            cartQuality++;
        }
    });


    return (
        <NavLink to={PRODUCT_ROUTE + `/${product.id}`} className={"products__item"} data-id={product.id}>
            <div className="products__item-content">
                <div className={"products__item-image"}>
                    <img src={product.image.path} alt={product.title}/>
                </div>
                <div className="products__item-name">
                    {product.title}
                </div>
                <div className="products__item-description" dangerouslySetInnerHTML={{__html: product.description}}></div>
            </div>
            <div className={"products__item-button"+ (inCart?  " products__item-button--success": "")}>
                <span>{product?.min_price + ' ₽'} {inCart ? " · "+cartQuality:""}</span>
                {icons.plus}
            </div>
        </NavLink>
    );
});

export default ProductCard;