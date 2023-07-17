import React, {useEffect} from 'react';
import './assets/stylesheets/main.css';
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {useTelegram} from "./hooks/useTelegram";
import AppStore from "./store/AppStore";
import {observer} from "mobx-react-lite";
import MenuButton from "./components/Nav/MenuButton";
import Menu from "./components/Nav/Menu";


const App = observer(() => {
    const {expandApp} = useTelegram();
    const {menu} = AppStore
    useEffect(()=>{
        expandApp();
    },[])

    return (
        <BrowserRouter>
            <div className={'app wrapper '+(menu.open ? 'open-menu':'')}>
                <AppRouter/>
            </div>
            <Menu/>
            <MenuButton/>
        </BrowserRouter>
    );

});

export default App;
