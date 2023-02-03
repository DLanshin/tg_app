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

            <button onClick={onClose}>Закрыть</button>
        </div>
    );
}