import React from 'react';
import uuid from "react-uuid";
import ProductCard from "./ProductCard";

const ProductList = ({products, emptyText}) => {
    
    return (
        <div className={'products'}>
            <div className={'products__list'}>
                {products.length > 0 ?
                    products.map(item => (
                        <ProductCard
                            key={uuid()}
                            product={item}
                        />
                    ))
                :
                  <div>
                      {emptyText}
                  </div>
                }
            </div>
        </div>
    );
};

export default ProductList;