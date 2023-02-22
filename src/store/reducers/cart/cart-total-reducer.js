const cartTotalActions = {
    SET_TOTAL: "SET_TOTAL"
}

let initialCartTotalState = {
    totalSum: 0,
};
export const cartTotalReducer = (state = initialCartTotalState, action) => {
    switch (action){
        case cartTotalActions.SET_TOTAL:
            state.product.map( () => {
                console.log("p1");
            });
            return state;
        default:
            return state;

        
    }
}