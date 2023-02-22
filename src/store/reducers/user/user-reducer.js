
let userActions = {
    FETCH_USER:"FETCH_USER"
}

let initialProductsState = {
    id: 97,
    name: "",
};
export const userReducer = (state = initialProductsState, action) => {
    switch (action.type){
        case userActions.FETCH_USER:
            return {
                ...state,
                name:action.payload.name,
            }
        default:
            return state;

    }
}


export const fetchUserAction = (userInfo) => ({type: userActions.FETCH_USER, payload:userInfo});

