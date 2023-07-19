import React from 'react';
import uuid from "react-uuid";
import CartProduct from "./CartProduct";
import {icons} from "../icons";

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
              <div className={'empty opacity-4'}>
                  {icons.cart}
                  <div className="empty__text">
                      {props.emptyText}
                  </div>
              </div>
            }
        </div>
    );
};

export default CartList;