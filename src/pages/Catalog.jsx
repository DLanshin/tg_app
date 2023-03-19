import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ProductList from "../components/Catalog/Product/ProductList";
import {getContacts} from "../services/contactsApi";
import {getProduct, getProducts} from "../services/productsApi";



const Catalog = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.catalog.products);
    useEffect(()=>{
        dispatch(getProducts())
    }, []);
    return (
        <div>

            <ProductList
                products={products}
                emptyText={"Товары не найдены"}
            />

        </div>
    );
}
export default Catalog;