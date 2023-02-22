import React, {useEffect} from 'react';
import ProductList from "../components/Catalog/Product/ProductList";
import {useDispatch, useSelector} from "react-redux";
import CatalogNavPanel from "../components/Catalog/Category/CatalogNavPanel";
import {getProducts} from "../api/products";



const Cart = (props) => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);

    useEffect(()=>{
        dispatch(getProducts())
    }, []);



    return (
        <div>
            <ProductList
                products={products}
                emptyText={"Ваша корзина пуста"}
            />
        </div>
    );
}
export default Cart;