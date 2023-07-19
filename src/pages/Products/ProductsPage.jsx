import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import ProductCatalogStore from "../../store/catalog/products/ProductStore";
import CategoryList from "../../components/Catalog/Category/CategoryList";
import ProductList from "../../components/Catalog/Product/ProductList";
import ProductStore from "../../store/catalog/products/ProductStore";



const ProductsPage = observer(() => {
    const [chooseCategory, setChooseCategory] = useState(null);
    const {items, categories,isLoading} = ProductStore;
    useEffect(()=>{
        ProductStore.fetchCategories()
    },[]);

    useEffect(()=>{
        ProductCatalogStore.setFilter({
            category_id:chooseCategory ? chooseCategory.id : null
        });
        ProductCatalogStore.fetchList()


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
                emptyText={"Товары не найдены"}
                isLoading={isLoading}
            />
        </div>
    );
});
export default ProductsPage;