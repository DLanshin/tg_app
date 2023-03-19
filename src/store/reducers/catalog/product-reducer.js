
let productActions = {
    FETCH_PRODUCT_ITEM: "FETCH_PRODUCT_ITEM",
    CHOOSE_SKU: "CHOOSE_SKU",
}

let initialProductState = {
    isLoading:true,
    id:null,
    image:null,
    title:null,
    description:null,
    category:null,
    price:null,
    skus:null,
    selectedSku:null
};
export const productReducer = (state = initialProductState, action) => {
    switch (action.type){
        case productActions.FETCH_PRODUCT_ITEM:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                selectedSku: action.payload?.skus ? action.payload?.skus[0] : null
            };
        case productActions.CHOOSE_SKU:
            state.skus.forEach(sku => {
                if(sku.id === action.payload){
                    console.log(sku);
                    return {
                        ...state,
                        selectedSku: sku
                    }
                }

            });
            return {
                ...state
            }
        default:
            return state;

    }
}
export const fetchProductAction = (product) => ({type: productActions.FETCH_PRODUCT_ITEM, payload:product});
export const chooseSkuAction = (sku_id) => ({type: productActions.CHOOSE_SKU, payload:sku_id});
