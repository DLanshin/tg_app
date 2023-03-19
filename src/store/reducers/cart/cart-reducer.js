import {useDispatch} from "react-redux";
import {isInCartProductAction} from "../catalog/catalog-reducer";

let cartActions = {
    FETCH_CART_PRODUCTS: "FETCH_CART_PRODUCTS",
    ADD_PRODUCT: "ADD_PRODUCT",
    REMOVE_PRODUCT: "REMOVE_PRODUCT",
    INCREMENT_QUANTITY: "INCREMENT_QUANTITY",
    DECREMENT_QUANTITY: "DECREMENT_QUANTITY"
}

let initialCartState = {
    quantity: 0,
    products: [],
};
export const cartReducer = (state = initialCartState, action) => {
    let products = [];
    switch (action.type){
        case cartActions.ADD_PRODUCT:
            let hasInCart = false;
            products = [...state.products];
            const cartProduct = {
                ...action.payload,
                totalPrice: +action.payload.price,
                count:1
            }
            if(products.length){
                products.forEach(item =>{
                    if(item.id === cartProduct.id){
                        item.count++;
                        item.totalPrice = +item.price * item.count;
                        hasInCart = true;
                    }
                })
            }
            if(hasInCart){
                return {...state, quantity: ++state.quantity, products: products}
            }else{
                return {...state, quantity: ++state.quantity, products:[...state.products, cartProduct]};
            }
        case cartActions.REMOVE_PRODUCT:
            return state;
        case cartActions.INCREMENT_QUANTITY:
            products = [...state.products];
            products.forEach(item =>{
                if(item.id === action.payload.id){
                    item.count++;
                    item.totalPrice = +item.price * item.count;
                }
            })
            return {...state, quantity: ++state.quantity, products: products};
        case cartActions.DECREMENT_QUANTITY:
            products = [...state.products];
            products.forEach((item, index, object) =>{
                if(item.id === action.payload.id){
                    if(item.count > 1){
                        item.count--;
                        item.totalPrice = +item.price * item.count;
                    }else{
                        object.splice(index, 1);
                    }
                }
            })
            return {...state, quantity: --state.quantity, products: products};
        default:
            return state;

    }
}
export const fetchCartProductAction = () => ({type: cartActions.FETCH_CART_PRODUCTS});
export const addProductAction = (product) => ({type: cartActions.ADD_PRODUCT, payload:product});
export const removeProductAction = (product) => ({type: cartActions.REMOVE_PRODUCT, payload:product});
export const incrementQualityAction = (product) => ({type: cartActions.INCREMENT_QUANTITY, payload:product});
export const decrementQualityAction = (product) => ({type: cartActions.DECREMENT_QUANTITY, payload:product});
