let categoriesActions = {
    FETCH_CATEGORIES: "FETCH_CATEGORIES",
}

let initialCategoriesState = {
    categories: [],

};
export const categoriesReducer = (state = initialCategoriesState, action) => {
    switch (action.type){
        case categoriesActions.FETCH_CATEGORIES:
            return {...state, categories: action.payload};
        default:
            return state;

    }
}
export const fetchCategoriesAction = (categories) => ({type: categoriesActions.FETCH_CATEGORIES, payload:categories});
