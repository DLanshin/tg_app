import React from 'react';
import {NavLink} from "react-router-dom";
import {PRODUCT_ROUTE} from "../../../utils/consts";
import {icons} from "../../icons";

const ProductCard = ({product}) => {
    return (
        <div className={"products__item"} data-id={product.id}>
            <NavLink to={PRODUCT_ROUTE + `/${product.id}`}>
                <img className={"products__item-image"} src={product.image.path} alt={product.title}/>
            </NavLink>
            <div className="products__item-content">
                <div className="products__item-name">
                    {product.title}
                </div>
                <div className="products__item-description" dangerouslySetInnerHTML={{__html: product.description}}></div>

                <NavLink to={PRODUCT_ROUTE + `/${product.id}`} className={"products__item-button"}>
                    <span>{product?.min_price + ' ₽'}</span>
                    {icons.plus}
                </NavLink>
            </div>
        </div>
    );
};

export default ProductCard;