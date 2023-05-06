import React from 'react';
import Tabs from "../../components/Tabs/Tabs";
import ProductCatalog from "./Products/ProductCatalog";
import ServiceCatalog from "./Services/ServiceCatalog";
import BookingCatalog from "./Booking/BookingCatalog";




const Catalog = () => {
    const tabs = [
        { title: 'Забронировать', content: <BookingCatalog/> },
        { title: 'Услуги', content: <ServiceCatalog/> },
        { title: 'Заказать', content: <ProductCatalog/> },
    ];
    return (
        <div className="container">
            <Tabs items={tabs}/>
        </div>
    );
}
export default Catalog;