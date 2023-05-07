import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import ProductCatalogStore from "../../../store/catalog/products/ProductCatalogStore";
import CartStore from "../../../store/cart/CartStore";
import Spinner from "../../../components/Loaders/Spinner";
import ProductList from "../../../components/Catalog/Product/ProductList";
import ProductSlider from "../../../components/Catalog/Product/ProductSlider";
import CategoriesStore from "../../../store/categories/CategoriesStore";
import CategoryList from "../../../components/Catalog/Category/CategoryList";




const ProductCatalog = observer(() => {
    const {products, popular, filter, main_category_alias} = ProductCatalogStore;
    const {categories} = CategoriesStore;

    useEffect(()=>{
        ProductCatalogStore.fetchCatalog()
            .then(()=>CartStore.fetchCart())
            .then(()=>CategoriesStore.fetchCategories(main_category_alias))
        return ()=>{
            CategoriesStore.unsetCategories()
        }
    },[])

    const toggleCategory = (id) =>{
        ProductCatalogStore.setFilter({
            category_id:filter.category_id === id ? null : id
        });
        ProductCatalogStore.fetchCatalog();
    }
    if(ProductCatalogStore.isLoading || CartStore.isLoading || CategoriesStore.isLoading){
        return <Spinner/>
    }

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
                    products={popular}/>
                : null
            }

            <ProductList
                type={'line'}
                products={products}
                emptyText={"Товары не найдены"}
            />

        </div>
    );
});
export default ProductCatalog;