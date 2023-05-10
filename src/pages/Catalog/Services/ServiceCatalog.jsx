import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import ServiceCatalogStore from "../../../store/catalog/services/ServiceCatalogStore";
import CartStore from "../../../store/cart/CartStore";
import Spinner from "../../../components/Loaders/Spinner";
import CategoryList from "../../../components/Catalog/Category/CategoryList";
import ServicesList from "../../../components/Catalog/Services/ServicesList";
import CategoriesStore from "../../../store/categories/CategoriesStore";
import ProductSlider from "../../../components/Catalog/Product/ProductSlider";
import {SERVICE_ROUTE} from "../../../utils/consts";




const ServiceCatalog = observer(() => {
    const {services, filter, popular, main_category_alias} = ServiceCatalogStore;
    const {categories} = CategoriesStore;
    useEffect(()=>{
        ServiceCatalogStore.fetchServiceCatalog()
            .then(()=>CartStore.fetchCart())
            .then(()=>CategoriesStore.fetchCategories(main_category_alias))
        return ()=>{
            CategoriesStore.unsetCategories()
        }
    },[])
    const toggleCategory = (id) =>{
        ServiceCatalogStore.setFilter({
            category_id:filter.category_id === id ? null : id
        });
        ServiceCatalogStore.fetchServiceCatalog();
    }
    if(ServiceCatalogStore.isLoading || CartStore.isLoading || CategoriesStore.isLoading){
        return <Spinner/>
    }
    console.log(popular.length)
    return (
        <div>
            <CategoryList
                items={categories}
                onChange={toggleCategory}
                value={filter.category_id}
                />
            {popular.length > 2 ?
                <ProductSlider
                    title={"Популярное"}
                    urlRule={SERVICE_ROUTE}
                    products={popular}/>
                : null
            }
            <ServicesList
                products={services}
                type={'line'}
                emptyText={"Услуги не найдены"}
            />

        </div>
    );
});
export default ServiceCatalog;