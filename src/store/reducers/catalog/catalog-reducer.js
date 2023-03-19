
let catalogActions = {
    FETCH_PRODUCT: "FETCH_PRODUCT",
}

let initialProductsState = {
    products: [],
};
export const catalogReducer = (state = initialProductsState, action) => {
    switch (action.type){
        case catalogActions.FETCH_PRODUCT:
            return {
                ...state,
                products: action.payload
            };
        default:
            return state;

    }
}
export const fetchProductsAction = (products) => ({type: catalogActions.FETCH_PRODUCT, payload:products});
