import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCartProductAction} from "../store/reducers/cart/cart-reducer";
import NavPanel from "../components/Nav/NavPanel";
import CartList from "../components/Cart/CartList";



const Cart = (props) => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.cart.products);

    useEffect(()=>{
        dispatch(fetchCartProductAction())
    }, []);



    return (
        <div>
            <NavPanel/>
            <CartList
                products={products}
                emptyText={"Ваша корзина пуста"}
            />
        </div>
    );
}
export default Cart;