import React, {useEffect, useState} from 'react';
import BotStore from "../../store/bot/BotStore";
import {observer} from "mobx-react-lite";
import CategoriesStore from "../../store/categories/CategoriesStore";
import Spinner from "../../components/Loaders/Spinner";
import CategoryList from "../../components/Catalog/Category/CategoryList";
import ProductList from "../../components/Catalog/Product/ProductList";
import ServiceCatalogStore from "../../store/catalog/services/ServiceCatalogStore";



const ServicesPage = observer(() => {
    const [chooseCategory, setChooseCategory] = useState(null);
    const {categories} = CategoriesStore;
    const {services} = ServiceCatalogStore;
    useEffect(()=>{
        CategoriesStore.fetchCategories("services")
    },[]);
    useEffect(()=>{
        ServiceCatalogStore.setFilter({
            category_id:chooseCategory ? chooseCategory.id : null
        });
        console.log(ServiceCatalogStore.filter)
        ServiceCatalogStore.fetchServiceCatalog()


    },[chooseCategory])
    if(BotStore.isLoading || CategoriesStore.isLoading){
        return <Spinner/>
    }
    return (
        <div>
            <CategoryList
                items={categories}
                value={chooseCategory}
                onChange={setChooseCategory}
            />
            <ProductList
                products={services}
                emptyText={"Услуги не найдены"}
                isLoading={ServiceCatalogStore.isLoading}
            />
        </div>
    );
});
export default ServicesPage;