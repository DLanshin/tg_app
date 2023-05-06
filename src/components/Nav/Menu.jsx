import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {
    CART_ROUTE,
    CATALOG_ROUTE,
    CONTACTS_ROUTE,
    HOME_ROUTE,
    ORDERS_ROUTE,
    PROFILE_ROUTE,
} from "../../utils/consts";
import {observer} from "mobx-react-lite";
import CartStore from "../../store/cart/CartStore";


const Menu = observer((props) => {
    const [menuOpen, setMenuOpen] = useState(false);
    
    return (
        <>
            <div className={'menu'}>
                <div className={'menu__list'}>
                    <NavLink to={HOME_ROUTE} className={'menu__item'}>
                        Главная
                    </NavLink>
                    <NavLink to={CATALOG_ROUTE} className={'menu__item'}>
                        Каталог
                    </NavLink>
                    <NavLink to={CART_ROUTE} className={'menu__item'}>
                        {
                            CartStore.quality ? <span className={'badge badge--circle'}>{CartStore.quality}</span> : ""
                        }
                        Корзина
                    </NavLink>
                    <NavLink to={ORDERS_ROUTE} className={'menu__item'}>
                        Заказы
                    </NavLink>
                    <NavLink to={PROFILE_ROUTE} className={'menu__item'}>
                        Профиль
                    </NavLink>
                    <NavLink to={CONTACTS_ROUTE} className={'menu__item'}>
                        Контакты
                    </NavLink>

                </div>
            </div>
        </>
    );
});

export default Menu;