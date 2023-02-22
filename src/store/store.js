import {cartReducer} from "./reducers/cart/cart-reducer";
import {cartTotalReducer} from "./reducers/cart/cart-total-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {categoriesReducer} from "./reducers/catalog/categories-reducer";
import {productsReducer} from "./reducers/catalog/products-reducer";
import thunk from "redux-thunk";
import {userReducer} from "./reducers/user/user-reducer";

let rootReducer = combineReducers({
    cart: cartReducer,
    cartTotal: cartTotalReducer,
    categoriesList: categoriesReducer,
    products: productsReducer,
    user_info: userReducer

})
export let store = createStore(rootReducer, applyMiddleware(thunk));

window.state = store.getState();
