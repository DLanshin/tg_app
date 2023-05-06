import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import CartStore from "../../store/cart/CartStore";
import CartList from "../../components/Cart/CartList";
import Spinner from "../../components/Loaders/Spinner";


const Cart = observer((props) => {

    useEffect(() => {
        CartStore.fetchCart();
    }, [])
    if(CartStore.isLoading){
        return <Spinner/>
    }
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