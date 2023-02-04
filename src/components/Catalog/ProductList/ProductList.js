import React from 'react';
import ProductCard from "../ProductCard/ProductCard";

const ProductList = (props) => {
    return (
        <div className={'product'}>
            <div className={'product__list'}>
                {props.products.map(item => (
                    <ProductCard product={item}/>
                ))}
            </div>
        </div>
    );
};

export default ProductList;