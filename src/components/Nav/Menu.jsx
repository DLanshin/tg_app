import React from 'react';
import {NavLink} from "react-router-dom";
import * as CONFIG_ROUTES  from "../../utils/consts";
import {observer} from "mobx-react-lite";
import CartStore from "../../store/cart/CartStore";
import {useAuth} from "../../hooks/useAuth";


const Menu = observer((props) => {
    const {getBotId} = useAuth();
    console.log(CONFIG_ROUTES.HOME_ROUTE.replace(':bot_id', 'getBotId'));
    return (
        <>
            <div className={'menu'}>
                <div className={'menu__list'}>
                    <NavLink to={CONFIG_ROUTES.HOME_ROUTE.replace(':bot_id', getBotId())} className={'menu__item'}>
                        Главная
                    </NavLink>
                    <NavLink to={CONFIG_ROUTES.CATALOG_ROUTE.replace(':bot_id', getBotId())} className={'menu__item'}>
                        Каталог
                    </NavLink>
                    <NavLink to={CONFIG_ROUTES.CART_ROUTE.replace(':bot_id', getBotId())} className={'menu__item'}>
                        {
                            CartStore.quality ? <span className={'badge badge--circle'}>{CartStore.quality}</span> : ""
                        }
                        Корзина
                    </NavLink>
                    <NavLink to={CONFIG_ROUTES.ORDERS_ROUTE.replace(':bot_id', getBotId())} className={'menu__item'}>
                        Заказы
                    </NavLink>
                    <NavLink to={CONFIG_ROUTES.PROFILE_ROUTE.replace(':bot_id', getBotId())} className={'menu__item'}>
                        Профиль
                    </NavLink>
                    <NavLink to={CONFIG_ROUTES.CONTACTS_ROUTE.replace(':bot_id', getBotId())} className={'menu__item'}>
                        Контакты
                    </NavLink>

                </div>
            </div>
        </>
    );
});

export default Menu;