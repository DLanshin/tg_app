
let cartActions = {
    FETCH_PRODUCT: "FETCH_PRODUCT",
}

let initialProductsState = {
    products: [],
};
export const productsReducer = (state = initialProductsState, action) => {
    switch (action.type){
        case cartActions.FETCH_PRODUCT:
            return {
                ...state,
                products: action.payload.products
            };
        default:
            return state;

    }
}
export const fetchProductsAction = (products) => ({type: cartActions.FETCH_PRODUCT, payload:products});
