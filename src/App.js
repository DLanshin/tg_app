import React, {useEffect} from 'react';
import './assets/stylesheets/main.css';
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useAuth} from "./hooks/useAuth";
import {check, login} from "./services/authService";
import ShopLoader from "./components/Loaders/ShopLoader";
import Spinner from "./components/Loaders/Spinner";

const App = () => {
    const dispatch = useDispatch(),
        {checkAuth} = useAuth(),
        {isAuth, isLoading} = useSelector(state => state.user),
        REACT_APP_BOT_ID=5569923498,
        REACT_APP_USER_ID=5467763995;
    useEffect(()=>{
        if(checkAuth(REACT_APP_BOT_ID, REACT_APP_USER_ID)){
            dispatch(check(REACT_APP_USER_ID));
        }else{
            dispatch(login(REACT_APP_BOT_ID, REACT_APP_USER_ID));
        }
    },[]);

    if(!isAuth || isLoading){
        return (
            <>
                <ShopLoader/>
            </>
        );
    }else{
        return (
            <BrowserRouter>
                <div className={'app wrapper'}>
                    <AppRouter/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
