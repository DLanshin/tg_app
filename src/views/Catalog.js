import React from 'react';
import Header from "../layouts/Header/Header";
import {useTelegram} from "../hooks/useTelegram";




const Catalog = (props) => {
    const {onToggleButton} = useTelegram();
    return (
        <div>

            <Header/>
            <button onClick={onToggleButton}>toggle</button>
        </div>
    );
}
export default Catalog;