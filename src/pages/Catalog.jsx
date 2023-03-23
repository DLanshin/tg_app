import React, {useEffect} from 'react';
import ProductList from "../components/Catalog/Product/ProductList";
import CatalogStore from "../store/catalog/CatalogStore";
import {observer} from "mobx-react-lite";
import CartStore from "../store/cart/CartStore";




const Catalog = observer(() => {
    const products = CatalogStore.products;
    useEffect(()=>{
        if(!CatalogStore.products.length){
            CatalogStore.fetchCatalog()
                .then(()=>CartStore.fetchCart())
        }
    },[])
    return (
        <div>
            <ProductList
                products={products}
                emptyText={"Товары не найдены"}
            />

        </div>
    );
});
export default Catalog;