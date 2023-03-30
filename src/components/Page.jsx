import NavPanel from "./Nav/NavPanel";
import BottomNavPanel from "./Nav/BottomNavPanel";
import {useAuth} from "../hooks/useAuth";
import UserStore from "../store/user/UserStore";
import {useLocation, useParams, useSearchParams} from "react-router-dom";
import React, {useEffect} from "react";
import ShopLoader from "./Loaders/ShopLoader";
import {useTelegram} from "../hooks/useTelegram";
import {observer} from "mobx-react-lite";
import Spinner from "./Loaders/Spinner";

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
        <div className={"page "+(showTopPanel ? "with-top-panel" : "")+" "+(showBottomPanel ? "with-bottom-panel" : "")}>
            {showTopPanel ? <NavPanel type={navType}/> : ""}
                {element}
            {showBottomPanel ? <BottomNavPanel/> : ""}

        </div>
    );
});

export default Page;
