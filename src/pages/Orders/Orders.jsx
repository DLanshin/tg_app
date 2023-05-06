import React from 'react';
import ProductOrders from "./ProductOrders";
import BookingOrders from "./BookingOrders";
import Tabs from "../../components/Tabs/Tabs";




const Orders = () => {
    const tabs = [
        { title: 'Заказы', content: <ProductOrders/> },
        { title: 'Бронирования', content: <BookingOrders/> },
    ];
    return (
        <div className="container">
            <Tabs items={tabs}/>
        </div>
    );
}
export default Orders;