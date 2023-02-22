let cartActions = {
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
    switch (action.type){
        case cartActions.ADD_PRODUCT:
            let cartProduct = {
                ...action.payload,
                totalPrice: +action.payload.price
            }
            console.log([...state.products, cartProduct]);
            return {...state, products:[...state.products, cartProduct]};
        case cartActions.REMOVE_PRODUCT:
            return state;
        case cartActions.INCREMENT_QUANTITY:
            return {...state, quantity: ++state.quantity};
        case cartActions.DECREMENT_QUANTITY:
            return {...state, quantity: state.quantity--};
        default:
            return state;

    }
}
export const addProductAction = (product) => ({type: cartActions.ADD_PRODUCT, payload:product});
export const removeProductAction = (product_id) => ({type: cartActions.REMOVE_PRODUCT, payload:product_id});
export const incrementQualityAction = () => ({type: cartActions.INCREMENT_QUANTITY});
export const decrementQualityAction = () => ({type: cartActions.DECREMENT_QUANTITY});
