import {cartReducer} from "./reducers/cart/cart-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {categoriesReducer} from "./reducers/catalog/categories-reducer";
import {catalogReducer} from "./reducers/catalog/catalog-reducer";
import {contactsReducer} from "./reducers/settings/contacts-reducer";
import thunk from "redux-thunk";
import {userReducer} from "./reducers/user/user-reducer";
import {productReducer} from "./reducers/catalog/product-reducer";

let rootReducer = combineReducers({
    cart: cartReducer,
    categories: categoriesReducer,
    catalog: catalogReducer,
    product: productReducer,
    user: userReducer,
    contacts: contactsReducer,

})
export let store = createStore(rootReducer, applyMiddleware(thunk));

window.state = store.getState();
