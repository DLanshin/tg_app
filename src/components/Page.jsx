import {useAuth} from "../hooks/useAuth";
import UserStore from "../store/user/UserStore";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import React, {useEffect} from "react";
import ShopLoader from "./Loaders/ShopLoader";
import {useTelegram} from "../hooks/useTelegram";
import {observer} from "mobx-react-lite";
import AppStore from "../store/AppStore";
import CartStore from "../store/cart/CartStore";
import {CART_ROUTE} from "../utils/consts";
import Button from "./Button/Button";

const Page = observer(({showTopPanel, showBottomPanel, navType, element}) => {
    const {checkCredential} = useAuth()
    const {isAuth, isLoading} = UserStore;
    const {user, showMainButton, initBackButton, showTelegramAlert} = useTelegram()
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const {pathname} = useLocation()

    const user_id= user ? user.id : 5467763995;
    const bot_id = searchParams.get("bot_id") ? searchParams.get("bot_id") : 5569923498;

    useEffect(()=>{
        showMainButton({
            text: 'Оформить заказ' + (CartStore.total_price ? " · "+CartStore.total_price+" P": ""),
            is_visible: !!CartStore.quality
        },()=>{
            navigate(CART_ROUTE)
        })
    },[CartStore.quality]);
    useEffect(()=>{
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
