import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import ProductCatalogStore from "../../store/catalog/products/ProductStore";
import CategoryList from "../../components/Catalog/Category/CategoryList";
import ProductList from "../../components/Catalog/Product/ProductList";
import BannersSlider from "../../components/Banners/BannersSlider";

import ProductStore from "../../store/catalog/products/ProductStore";
import CartStore from "../../store/cart/CartStore";
import {CART_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";



const ProductsPage = observer(() => {
    const [chooseCategory, setChooseCategory] = useState(null);
    const {items, categories,isLoading} = ProductStore;
    const {quality} = CartStore;
    const navigate = useNavigate();
    const {showMainButton} = useTelegram()


    useEffect(()=>{
        ProductStore.fetchCategories()
        if(CartStore.quality){
            showMainButton({
                text: `Перейти в корзину  ${CartStore.total_price} Р`,
                is_visible: true,
            }, () => {navigate(CART_ROUTE)})
        }
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
            <BannersSlider />
            <ProductList
                products={items}
                emptyText={"Товары не найдены"}
                isLoading={isLoading}
            />
        </div>
    );
});
export default ProductsPage;