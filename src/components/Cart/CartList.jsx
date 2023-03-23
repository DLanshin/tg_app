import React from 'react';
import uuid from "react-uuid";
import CartProduct from "./CartProduct";

const CartList = (props) => {
    return (
        <div className={'cart__list'}>
            {props.products.length > 0 ?
                props.products.map(item => (
                    <CartProduct
                        key={uuid()}
                        product={item}
                    />
                ))
            :
              <div>
                  {props.emptyText}
              </div>
            }
        </div>
    );
};

export default CartList;