
let userActions = {
    LOGIN_USER:"AUTH_USER",
    CHECK_USER:"CHECK_USER"
}

let initialProductsState = {
    isAuth: false,
    isLoading: true,
    id:"",
    name: "",
};
export const userReducer = (state = initialProductsState, action) => {
    switch (action.type){
        case userActions.LOGIN_USER:
            return {
                ...state,
                isAuth: true,
                isLoading: false,
            }
        case userActions.CHECK_USER:
            return {
                ...state,
                isAuth: true,
                isLoading: false
            }
        default:
            return state;

    }
}


export const authUserAction = (tokenData) => ({type: userActions.LOGIN_USER, payload:tokenData});
export const checkUserAction = (tokenData) => ({type: userActions.CHECK_USER, payload:tokenData});

