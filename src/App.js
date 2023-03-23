import React, {useEffect} from 'react';
import './assets/stylesheets/main.css';
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {useAuth} from "./hooks/useAuth";
import ShopLoader from "./components/Loaders/ShopLoader";
import {observer} from "mobx-react-lite";
import UserStore from "./store/user/UserStore";
import {useTelegram} from "./hooks/useTelegram";


const App = observer(() => {
    const {checkAuth} = useAuth(),
        {isAuth, isLoading} = UserStore,
        REACT_APP_BOT_ID=5569923498,
        REACT_APP_USER_ID=5467763995;
    const {tg, user, onClose, showTelegramAlert, expandApp} = useTelegram();
    useEffect(()=>{
        if(checkAuth(REACT_APP_BOT_ID, REACT_APP_USER_ID)){
            UserStore.check(REACT_APP_USER_ID);
        }else{
            UserStore.login(REACT_APP_BOT_ID, REACT_APP_USER_ID);
        }
    },[isAuth]);
    // if(!isAuth || isLoading){
    //     return (
    //         <>
    //             <ShopLoader/>
    //         </>
    //     );
    // }
    return (
        <BrowserRouter>
            <br/>
                <br/>
            <pre>
                {JSON.stringify(tg,null,' ')}
            </pre>
            <pre>
                {JSON.stringify(user, null, ' ')}
            </pre>
            <button onClick={onClose}>Закрыть</button>
            <button onClick={()=>showAlert("message")}>showAlert</button>
            <div className={'app wrapper'}>
                <AppRouter/>
            </div>
        </BrowserRouter>
    );

});

export default App;
