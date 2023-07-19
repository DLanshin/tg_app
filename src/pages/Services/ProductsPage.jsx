import React, {useEffect, useState} from 'react';
import BotStore from "../../store/bot/BotStore";
import {observer} from "mobx-react-lite";
import CategoriesStore from "../../store/categories/CategoriesStore";
import ProductCatalogStore from "../../store/catalog/products/ProductCatalogStore";
import Spinner from "../../components/Loaders/Spinner";
import CategoryList from "../../components/Catalog/Category/CategoryList";
import ProductList from "../../components/Catalog/Product/ProductList";



const ProductsPage = observer(() => {
    const [chooseCategory, setChooseCategory] = useState(null);
    const {categories} = CategoriesStore;
    const {products} = ProductCatalogStore;
    useEffect(()=>{
        CategoriesStore.fetchCategories("products")
    },[]);
    useEffect(()=>{
        ProductCatalogStore.setFilter({
            category_id:chooseCategory ? chooseCategory.id : null
        });
        console.log(ProductCatalogStore.filter)
        ProductCatalogStore.fetchCatalog()


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
                products={products}
                emptyText={"Товары не найдены"}
                isLoading={ProductCatalogStore.isLoading}
            />
        </div>
    );
});
export default ProductsPage;