const cartTotalActions = {
    SET_TOTAL: "SET_TOTAL"
}

let initialCartTotalState = {
    totalSum: 0,
};
export const cartTotalReducer = (state = initialCartTotalState, action) => {
    switch (action){
        case cartTotalActions.SET_TOTAL:
            return state;
        default:
            return state;

        
    }
}