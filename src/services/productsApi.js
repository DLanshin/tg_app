import axios from "axios";
import {fetchProductsAction} from "../store/reducers/catalog/catalog-reducer";
import {fetchCategoriesAction} from "../store/reducers/catalog/categories-reducer";
import {fetchProductAction} from "../store/reducers/catalog/product-reducer";
import {$api} from "../http";



export const getProduct = (product_id) => {
    return async function (dispatch){
        const {data} =  await $api.get(`${localStorage.getItem('bot_id')}/product/${product_id}`);
        dispatch(fetchProductAction(data.data));
    }
}
export const getProducts = () => {
    return async function (dispatch){
        const {data} =  await $api.get(`${localStorage.getItem('bot_id')}/products`);
        dispatch(fetchProductsAction(data.data));
    }
}

export const getCategories = () => {
    return async function (dispatch){
        const {data} =  await $api.get(`${localStorage.getItem('bot_id')}/categories`);
        dispatch(fetchCategoriesAction(data.data));
    }
}

export const getProductsByCategory = (category) => {
    return async function (dispatch){
        const {data} = await $api.get(`${localStorage.getItem('bot_id')}/products?category_id=${category}`)
        dispatch(fetchProductsAction(data.data));
    }
}