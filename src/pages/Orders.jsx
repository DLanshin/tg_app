import React, {useEffect} from 'react';
import OrdersStore from "../store/order/OrdersStore";
import {observer} from "mobx-react-lite";
import OrderCard from "../components/Order/OrderCard";



const Orders = observer(() => {
    useEffect(()=>{
        OrdersStore.fetchOrders();
    },[]);

    const cancelOrder = (order) =>{
        OrdersStore.cancelOrder(order.id)
    }

    return (
        <div className="orders">
            <div className="orders__list">
                {
                    OrdersStore.orders.map((order)=>(
                        <OrderCard key={order.id} object={order} cancelOrder={cancelOrder}/>
                    ))
                }
            </div>

        </div>
    );
});
export default Orders;