import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import ServiceCatalogStore from "../../../store/catalog/services/ServiceCatalogStore";
import CartStore from "../../../store/cart/CartStore";
import Spinner from "../../../components/Loaders/Spinner";
import ServiceCategoryList from "../../../components/Catalog/Category/ServiceCategoryList";
import ServicesList from "../../../components/Catalog/Services/ServicesList";




const ServiceCatalog = observer(() => {
    const {services} = ServiceCatalogStore;
    const params = useParams();

    useEffect(()=>{
        if(!services.length){
            ServiceCatalogStore.fetchServiceCatalog()
                .then(()=>CartStore.fetchCart())
        }
    },[])

    if(ServiceCatalogStore.isLoading || CartStore.isLoading){
        return <Spinner/>
    }
    return (
        <div>
            <ServiceCategoryList category_alias={"services"}/>
            <ServicesList
                products={services}
                emptyText={"Услуги не найдены"}
            />

        </div>
    );
});
export default ServiceCatalog;