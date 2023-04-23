import React, {useEffect} from 'react';
import ProductList from "../components/Catalog/Product/ProductList";
import CatalogStore from "../store/catalog/CatalogStore";
import {observer} from "mobx-react-lite";
import CartStore from "../store/cart/CartStore";
import {useParams} from "react-router-dom";
import CategoryList from "../components/Catalog/Category/CategoryList";
import Spinner from "../components/Loaders/Spinner";




const Catalog = observer(() => {
    const products = CatalogStore.products;
    const params = useParams();

    useEffect(()=>{
        if(!CatalogStore.products.length){
            CatalogStore.fetchCatalog()
                .then(()=>CartStore.fetchCart())
        }
    },[])
    if(CatalogStore.isLoading || CartStore.isLoading){
        return <Spinner/>
    }
    return (
        <div>
            <CategoryList/>
            <ProductList
                products={products}
                emptyText={"Товары не найдены"}
            />

        </div>
    );
});
export default Catalog;