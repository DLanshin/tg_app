import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import CategoryList from "../../components/Catalog/Category/CategoryList";
import ProductList from "../../components/Catalog/Product/ProductList";
import ServiceCatalogStore from "../../store/catalog/services/ServiceStore";
import ServiceStore from "../../store/catalog/services/ServiceStore";



const ServicesPage = observer(() => {
    const [chooseCategory, setChooseCategory] = useState(null);
    const {items, categories, isLoading} = ServiceStore;
    useEffect(()=>{
        ServiceStore.fetchCategories()
    },[]);
    useEffect(()=>{
        ServiceCatalogStore.setFilter({
            category_id:chooseCategory ? chooseCategory.id : null
        });
        ServiceStore.fetchList()


    },[chooseCategory])

    return (
        <div>
            <CategoryList
                items={categories}
                value={chooseCategory}
                onChange={setChooseCategory}
            />
            <ProductList
                products={items}
                emptyText={"Услуги не найдены"}
                isLoading={isLoading}
            />
        </div>
    );
});
export default ServicesPage;