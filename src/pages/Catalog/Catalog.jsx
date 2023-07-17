import React, {useEffect} from 'react';
import Tabs from "../../components/Tabs/Tabs";
import ProductCatalog from "./Products/ProductCatalog";
import ServiceCatalog from "./Services/ServiceCatalog";
import BookingCatalog from "./Booking/BookingCatalog";
import {useSearchParams} from "react-router-dom";
import BotStore from "../../store/bot/BotStore";




const Catalog = () => {
    const [searchParams] = useSearchParams();
    const {modules, isLoading} = BotStore;
    let tabs = [];
    tabs = [
        { title: 'Забронировать', content: <BookingCatalog/> },
        { title: 'Услуги', content: <ServiceCatalog/> },
        { title: 'Заказать', content: <ProductCatalog/> },
    ];
    let tabIndex = 0;
    switch (searchParams.get("tab")){
        case 'booking':tabIndex = 0;break;
        case 'services':tabIndex = 1;break;
        case 'products':tabIndex = 2;break;
        default:tabIndex = 0;break;
    }
    return (
        <div className="container">
            <Tabs items={tabs} value={tabIndex}/>
        </div>
    );
}
export default Catalog;