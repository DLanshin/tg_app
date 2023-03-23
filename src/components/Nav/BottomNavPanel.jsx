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


const BottomNavPanel = observer((props) => {
    const [menuOpen, setMenuOpen] = useState(false);
    
    return (
        <>
            <div className={'bottom-panel'}>
                <div className={'bottom-panel__main-list'}>
                    <NavLink to={HOME_ROUTE} className={'bottom-panel__item'}>
                        {icons.home}
                    </NavLink>
                    <NavLink to={CATALOG_ROUTE} className={'bottom-panel__item'}>
                        {icons.catalog}
                    </NavLink>
                    <NavLink to={CART_ROUTE} className={'bottom-panel__item'}>
                        {
                            CartStore.quality ? <span className={'badge badge--circle'}>{CartStore.quality}</span> : ""
                        }

                        {icons.cart}
                    </NavLink>
                    <div className={'bottom-panel__item'} onClick={()=>{setMenuOpen(!menuOpen)}}>
                        {
                            menuOpen ?
                                icons.close
                                :
                                icons.menu
                        }
                    </div>
                </div>
                <div className={'bottom-panel__menu '+(menuOpen ? 'open': '')}>
                    <NavLink to={ORDERS_ROUTE} className={'bottom-panel__menu-item'}>
                        Мои заказы
                    </NavLink>
                    <NavLink to={PROFILE_ROUTE} className={'bottom-panel__menu-item'}>
                        Мой профиль
                    </NavLink>
                    <NavLink to={CONTACTS_ROUTE} className={'bottom-panel__menu-item'}>
                        Контакты
                    </NavLink>
                </div>
            </div>
            <div className={"bottom-panel__overlay "+ (menuOpen ? "show":"")}  onClick={()=>{setMenuOpen(!menuOpen)}}></div>
        </>
    );
});

export default BottomNavPanel;