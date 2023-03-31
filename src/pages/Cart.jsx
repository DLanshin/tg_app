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
            {
                CartStore.quality ?
                    <div className={"cart__total-info"}>
                        <NavLink to={MAKE_ORDER_ROUTE} className={"cart__button"}>Оформить
                            заказ {CartStore.total_price ? " · " + CartStore.total_price + " P" : ""}</NavLink>
                    </div>
                    :
                    ""
            }

        </div>
    );
});
export default Cart;