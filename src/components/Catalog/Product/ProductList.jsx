import React from 'react';
import uuid from "react-uuid";
import ProductCard from "./ProductCard";

const ProductList = (props) => {
    return (
        <div className={'product'}>
            <div className={'product__list'}>
                {props.products.length > 0 ?
                    props.products.map(item => (
                        <ProductCard
                            key={uuid()}
                            product={item}
                        />
                    ))
                :
                  <div>
                      Товары отстутствуют
                  </div>
                }
            </div>
        </div>
    );
};

export default ProductList;