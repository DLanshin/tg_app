import {useAuth} from "../hooks/useAuth";
import UserStore from "../store/user/UserStore";
import {useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ShopLoader from "./Loaders/ShopLoader";
import {useTelegram} from "../hooks/useTelegram";
import {observer} from "mobx-react-lite";
import MenuButton from "./Nav/MenuButton";

const Page = observer(({showTopPanel, showBottomPanel, navType, element}) => {
    const {checkCredential} = useAuth()
    const {isAuth, isLoading} = UserStore;
    const {user} = useTelegram()
    const [searchParams] = useSearchParams();


    const user_id= user ? user.id : 5467763995;
    const bot_id = searchParams.get("bot_id") ? searchParams.get("bot_id") : 5569923498;


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
