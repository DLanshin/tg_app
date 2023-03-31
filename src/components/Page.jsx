import {useAuth} from "../hooks/useAuth";
import UserStore from "../store/user/UserStore";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import React, {useEffect} from "react";
import ShopLoader from "./Loaders/ShopLoader";
import {useTelegram} from "../hooks/useTelegram";
import {observer} from "mobx-react-lite";
import AppStore from "../store/AppStore";
import CartStore from "../store/cart/CartStore";
import {CART_ROUTE, MAKE_ORDER_ROUTE} from "../utils/consts";

const Page = observer(({showTopPanel, showBottomPanel, navType, element}) => {
    const {checkCredential} = useAuth()
    const {isAuth, isLoading} = UserStore;
    const {user, showMainButton} = useTelegram()
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const {pathname} = useLocation()

    const user_id= user ? user.id : 5467763995;
    const bot_id = searchParams.get("bot_id") ? searchParams.get("bot_id") : 5569923498;
    let mainButtonProps = {
        text:'',
        isVisitable:false,
        path:null
    }
    useEffect(()=>{
        switch (location.pathname){
            case CART_ROUTE:
                mainButtonProps = {
                    text: `Оформить заказ  ${CartStore.total_price}`,
                    is_visible: !!CartStore.quality,
                    path: MAKE_ORDER_ROUTE
                }
                break
            default:
                mainButtonProps = {
                    text: `В корзине ${CartStore.quality} товаров`,
                    is_visible: !!CartStore.quality,
                    path:CART_ROUTE
                }
                break;
        }
        showMainButton({...mainButtonProps}, () => {navigate(mainButtonProps.path)})
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
