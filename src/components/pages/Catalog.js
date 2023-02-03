import React from 'react';
import {useEffect} from "react";
import Header from "../layout/header/Header";
import {useTelegram} from "../hooks/useTelegram";


const Catalog = (props) => {
    const {tg, user, onClose, onToggleButton} = useTelegram();
    return (
        <div>
            <Header/>
            <button onClick={onToggleButton}>toggle</button>
        </div>
    );
}
export default Catalog;