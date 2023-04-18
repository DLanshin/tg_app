import React from 'react';
import uuid from "react-uuid";
import ProductCard from "./ProductCard";

const ProductList = ({products, emptyText, type}) => {
    if(!products?.length){
        return (<></>);
    }
    return (
        <div className={'products'}>
            <div className={'products__list '+type}>
                {products.length > 0 ?
                    products.map(item => (
                        <ProductCard
                            type={type}
                            key={item.id}
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