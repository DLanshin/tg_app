import React, {useEffect} from 'react';
import CartList from "../components/Cart/CartList";
import CartStore from "../store/cart/CartStore";
import {observer} from "mobx-react-lite";


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