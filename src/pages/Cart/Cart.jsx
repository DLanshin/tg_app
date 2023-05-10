import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import CartStore from "../../store/cart/CartStore";
import CartList from "../../components/Cart/CartList";
import Spinner from "../../components/Loaders/Spinner";
import {MAKE_ORDER_ROUTE} from "../../utils/consts";
import {useTelegram} from "../../hooks/useTelegram";
import {useNavigate} from "react-router-dom";


const Cart = observer((props) => {
    const {showMainButton} = useTelegram();
    const navigate = useNavigate();

    useEffect(() => {
        CartStore.fetchCart().then(()=>{
            showMainButton({
                text: `Оформить заказ  ${CartStore.total_price} Р`,
                is_visible: !!CartStore.quality,
            }, () => {navigate(MAKE_ORDER_ROUTE)})
        })
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