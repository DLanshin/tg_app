import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import ProductCatalogStore from "../../../store/catalog/products/ProductStore";
import CartStore from "../../../store/cart/CartStore";
import Spinner from "../../../components/Loaders/Spinner";
import ProductList from "../../../components/Catalog/Product/ProductList";
import ProductSlider from "../../../components/Catalog/Product/ProductSlider";
import CategoriesStore from "../../../store/categories/CategoriesStore";
import CategoryList from "../../../components/Catalog/Category/CategoryList";
import {CART_ROUTE} from "../../../utils/consts";
import {useTelegram} from "../../../hooks/useTelegram";




const ProductCatalog = observer(() => {
    const {products, popular, filter, category_type} = ProductCatalogStore;
    const {categories} = CategoriesStore;
    const {showMainButton} = useTelegram();
    const navigate = useNavigate();


    useEffect(()=>{
        ProductCatalogStore.fetchCatalog()
            .then(()=>CartStore.fetchCart())
            .then(()=>CategoriesStore.fetchCategories(category_type))
            .then(()=>{
                showMainButton({
                    text: `В корзине ${CartStore.quality} товаров`,
                    is_visible: !!CartStore.quality,
                }, () => {navigate(CART_ROUTE)})
            })
        return ()=>{
            CategoriesStore.unsetCategories()
        }
    },[])
    useEffect(()=>{
        showMainButton({
            text: `В корзине ${CartStore.quality} товаров`,
            is_visible: !!CartStore.quality,
        }, () => {navigate(CART_ROUTE)})
    },[CartStore.quality]);

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