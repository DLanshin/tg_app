import {useAuth} from "../hooks/useAuth";
import UserStore from "../store/user/UserStore";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import React, {useEffect} from "react";
import ShopLoader from "./Loaders/ShopLoader";
import {useTelegram} from "../hooks/useTelegram";
import {observer} from "mobx-react-lite";
import AppStore from "../store/AppStore";
import CartStore from "../store/cart/CartStore";
import {CART_ROUTE, CATALOG_ROUTE, HOME_ROUTE, MAKE_ORDER_ROUTE, PRODUCT_ROUTE} from "../utils/consts";

const Page = observer(({showTopPanel, showBottomPanel, navType, element}) => {
    const {checkCredential} = useAuth()
    const {isAuth, isLoading} = UserStore;
    const {user, showMainButton, initBackButton} = useTelegram()
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const {pathname} = useLocation()

    //prod
    // const user_id= user ? user.id : null;
    const bot_id = searchParams.get("bot_id") ? searchParams.get("bot_id") : null;

    //dev
    const user_id= user ? user.id : 5467763995;
    // const bot_id = searchParams.get("bot_id") ? searchParams.get("bot_id") : null;

    const toggleMainButton = (pathmanu) =>{
        switch (pathname){
            case CART_ROUTE:
                showMainButton({
                    text: `Оформить заказ  ${CartStore.total_price} Р`,
                    is_visible: !!CartStore.quality,
                }, () => {navigate(MAKE_ORDER_ROUTE)})
                break
            case HOME_ROUTE:
            case CATALOG_ROUTE:
            case PRODUCT_ROUTE:
                showMainButton({
                    text: `В корзине ${CartStore.quality} товаров`,
                    is_visible: !!CartStore.quality,
                }, () => {navigate(CART_ROUTE)})
                break;
            default:
                showMainButton({
                    is_visible:false
                },null)
        }
    }
    useEffect(()=>{
        toggleMainButton(pathname)
    },[CartStore.quality]);

    useEffect(()=>{
        toggleMainButton(pathname)
        AppStore.toggleMenu(false);
    },[pathname])

    useEffect(()=>{

        if(checkCredential(bot_id, user_id)){
            UserStore.check(user_id);
        }else{
            UserStore.login(bot_id, user_id);
        }
    },[isAuth]);

    if(!isAuth || isLoading){
        return (
            <>
                <ShopLoader/>
            </>
        );
    }

    return (
        <div className={"page"}>
            {element}
        </div>
    );
});

export default Page;
