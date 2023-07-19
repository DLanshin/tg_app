import {useAuth} from "../hooks/useAuth";
import UserStore from "../store/user/UserStore";
import {useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import React, {useEffect} from "react";
import ShopLoader from "./Loaders/ShopLoader";
import {useTelegram} from "../hooks/useTelegram";
import {observer} from "mobx-react-lite";
import BotStore from "../store/bot/BotStore";
import CartStore from "../store/cart/CartStore";
import {MAKE_ORDER_ROUTE} from "../utils/consts";

const Page = observer(({showTopPanel, showBottomPanel, navType, element}) => {
    const {isAuth, isLoading} = UserStore;
    const {quality} = CartStore;
    const {user, showMainButton} = useTelegram()
    const params = useParams();
    const navigate = useNavigate();



    //prod
    let user_id= user ? user.id : null;
    let bot_id = params?.bot_id ? params.bot_id : null;
    //dev
    if(process.env.REACT_APP_MODE==="dev"){
        user_id = 5467763995;
        bot_id = 5848850433;
    }


    useEffect(()=>{
        UserStore.login(bot_id, user_id).then(()=>{
            BotStore.fetchSettings()
        })
    },[isAuth]);

    useEffect(()=>{
       if(CartStore.quality){
           showMainButton({
               text: `Перейти в корзину  ${CartStore.total_price} Р`,
               is_visible: true,
           }, () => {navigate(MAKE_ORDER_ROUTE)})
       }
    }, [quality]);

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
