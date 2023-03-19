import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCartProductAction} from "../store/reducers/cart/cart-reducer";
import NavPanel from "../components/Nav/NavPanel";
import CartList from "../components/Cart/CartList";
import BottomNavPanel from "../components/Nav/BottomNavPanel";



const Cart = (props) => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.cart.products);

    useEffect(()=>{
        dispatch(fetchCartProductAction())
    }, []);



    return (
        <>
            <CartList
                products={products}
                emptyText={"Ваша корзина пуста"}
            />
        </>
    );
}
export default Cart;