import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {
    CART_ROUTE,
    CATALOG_ROUTE,
    CONTACTS_ROUTE,
    HOME_ROUTE,
    ORDERS_ROUTE,
    PROFILE_ROUTE
} from "../../utils/consts";
import {icons} from "../icons";
import {observer} from "mobx-react-lite";
import CartStore from "../../store/cart/CartStore";
import AppStore from "../../store/AppStore";


const MenuButton = observer(() => {
    const menu = AppStore.menu;
    return (
        <button className={"menu-bottom"} onClick={()=>AppStore.toggleMenu(!menu.open)}>

            {menu.open ? icons.close : icons.menu}
        </button>
    );
});

export default MenuButton;