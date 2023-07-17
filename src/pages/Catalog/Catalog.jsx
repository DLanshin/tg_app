import React, {useEffect, useState} from 'react';
import Tabs from "../../components/Tabs/Tabs";
import ProductCatalog from "./Products/ProductCatalog";
import ServiceCatalog from "./Services/ServiceCatalog";
import BookingCatalog from "./Booking/BookingCatalog";
import {useSearchParams} from "react-router-dom";
import BotStore from "../../store/bot/BotStore";
import {observer} from "mobx-react-lite";



const Catalog = observer(() => {
    const [searchParams] = useSearchParams();
    const {modules, isLoading} = BotStore;
    const [ tabs, setTabs ] = useState([]);

    useEffect(()=>{
        let arrTabs = []
        if(modules?.products?.active){
            arrTabs.push({slug:'products', title: 'Заказать', content: <ProductCatalog/> })
        }
        if(modules?.services?.active){
            arrTabs.push({slug:'services', title: 'Услуги', content: <ServiceCatalog/> })
        }
        if(modules?.booking?.active){
            arrTabs.push({slug:'booking', title: 'Бронирование', content: <BookingCatalog/> })
        }
        setTabs(arrTabs)
    },[modules]);

    return (
        <div className="container">
            <Tabs items={tabs} value={searchParams.get("tab")}/>
        </div>
    );
});
export default Catalog;