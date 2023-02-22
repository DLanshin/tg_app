import React, {useEffect} from 'react';
import ProductList from "../components/Catalog/Product/ProductList";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../api/products";
import NavPanel from "../components/Nav/NavPanel";



const Catalog = (props) => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);

    useEffect(()=>{
        dispatch(getProducts())
    }, []);



    return (
        <div>
            <NavPanel
                type={"catalog"}
            />
            <ProductList
                products={products}
                emptyText={"Товары не найдены"}
            />
        </div>
    );
}
export default Catalog;