import React, {useEffect} from 'react';
import './assets/stylesheets/main.css';
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {useTelegram} from "./hooks/useTelegram";


const App = () => {
    const {expandApp} = useTelegram();

    useEffect(()=>{
        expandApp();
    },[])

    return (
        <BrowserRouter>
            <div className={'app wrapper'}>
                <AppRouter/>
            </div>
        </BrowserRouter>
    );

};

export default App;
