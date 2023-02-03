import React from 'react';
import {useEffect} from "react";

const tg = window.Telegram.WebApp;
const Catalog = (props) => {
    useEffect( () =>{
        tg.ready();
    },[]);
    const onClose = () =>{
        tg.close()
    }
    return (
        <div className="catalog">
            Каталог
            <button onClick={onClose}>Закрыть</button>
        </div>
    );
}
export default Catalog;