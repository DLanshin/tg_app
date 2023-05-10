import {useAuth} from "../hooks/useAuth";
import UserStore from "../store/user/UserStore";
import {useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
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
    const {pathname} = useLocation()
    const params = useParams();
    //prod
    let user_id= user ? user.id : null;
    let bot_id = params?.bot_id ? params.bot_id : null;
    //dev
    if(process.env.REACT_APP_MODE==="dev"){
        user_id = 5467763995;
        bot_id = 5848850433;
    }


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
