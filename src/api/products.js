import axios from "axios";
import {fetchProductsAction} from "../store/reducers/catalog/products-reducer";
import {fetchCategoriesAction} from "../store/reducers/catalog/categories-reducer";



export const getProducts = () => {
    return async function (dispatch){
        const products = await axios.get('https://dummyjson.com/products')
        dispatch(fetchProductsAction(products.data));
    }
}

export const getCategories = () => {
    return async function (dispatch){
        const categories = await axios.get('https://dummyjson.com/products/categories')
        dispatch(fetchCategoriesAction(categories.data));
    }
}

export const getProductsByCategory = (category) => {
    return async function (dispatch){
        const products = await axios.get(`https://dummyjson.com/products/category/${category}`)
        dispatch(fetchProductsAction(products.data));
    }
}