import React, {useEffect} from 'react';
import ProductList from "../components/Catalog/Product/ProductList";
import {useDispatch, useSelector} from "react-redux";
import CatalogNavPanel from "../components/Catalog/Category/CatalogNavPanel";
import {getProducts} from "../api/products";



const Catalog = (props) => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);

    useEffect(()=>{
        dispatch(getProducts())
    }, []);



    return (
        <div>
            <CatalogNavPanel />
            <ProductList products={products}/>
        </div>
    );
}
export default Catalog;