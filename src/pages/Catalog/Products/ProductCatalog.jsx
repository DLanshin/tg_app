import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import ProductCatalogStore from "../../../store/catalog/products/ProductCatalogStore";
import CartStore from "../../../store/cart/CartStore";
import Spinner from "../../../components/Loaders/Spinner";
import ProductCategoryList from "../../../components/Catalog/Category/ProductCategoryList";
import ProductList from "../../../components/Catalog/Product/ProductList";
import ProductSlider from "../../../components/Catalog/Product/ProductSlider";
import ServiceCatalogStore from "../../../store/catalog/services/ServiceCatalogStore";




const ProductCatalog = observer(() => {
    const {products, popular} = ProductCatalogStore;
    const params = useParams();

    useEffect(()=>{
        if(!ProductCatalogStore.products.length){
            ProductCatalogStore.fetchCatalog()
                .then(()=>CartStore.fetchCart())
        }
    },[])
    if(ProductCatalogStore.isLoading || CartStore.isLoading){
        return <Spinner/>
    }
    return (
        <div>
            {popular.length ?
                <ProductSlider
                    title={"Популярное"}
                    products={popular}/>
                : null
            }
            <ProductCategoryList category_alias={"products"}/>
            <ProductList
                products={products}
                emptyText={"Товары не найдены"}
            />

        </div>
    );
});
export default ProductCatalog;