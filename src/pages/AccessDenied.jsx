import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCartProductAction} from "../store/reducers/cart/cart-reducer";
import NavPanel from "../components/Nav/NavPanel";
import CartList from "../components/Cart/CartList";
import BottomNavPanel from "../components/Nav/BottomNavPanel";



const AccessDenied = (props) => {


    return (
        <div>
            Access denied
        </div>
    );
}
export default AccessDenied;