
let contactsActions = {
    FETCH_CONTACTS:"FETCH_CONTACTS"
}

let initialProductsState = {
    isLoading: true,
    address:null,
    email:null,
    geo_lat:null,
    geo_lon:null,
    instagram:null,
    phone:null,
    policy_text:null,
    site:null,
    vk:null,
    youtube:null,
};
export const contactsReducer = (state = initialProductsState, action) => {
    switch (action.type){
        case contactsActions.FETCH_CONTACTS:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
            }
        default:
            return state;

    }
}


export const fetchContactsAction = (contacts) => ({type: contactsActions.FETCH_CONTACTS, payload:contacts});

