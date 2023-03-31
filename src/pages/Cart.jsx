import React, {useEffect} from 'react';
import CartList from "../components/Cart/CartList";
import {NavLink, useNavigate} from "react-router-dom";
import {CART_ROUTE, MAKE_ORDER_ROUTE} from "../utils/consts";
import CartStore from "../store/cart/CartStore";
import {observer} from "mobx-react-lite";
import {useTelegram} from "../hooks/useTelegram";


const Cart = observer((props) => {

    useEffect(() => {
        CartStore.fetchCart();
    }, [])
    return (
        <div className={'cart'}>
            <CartList
                products={CartStore.products}
                emptyText={"Ваша корзина пуста"}
            />
        </div>
    );
});
export default Cart;