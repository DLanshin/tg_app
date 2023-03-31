import React from 'react';
import {icons} from "../icons";
import {observer} from "mobx-react-lite";
import AppStore from "../../store/AppStore";


const MenuButton = observer(() => {
    const menu = AppStore.menu;
    return (
        <button className={"menu-bottom"} onClick={()=>AppStore.toggleMenu(!menu.open)}>
            {menu.open ? icons.close : icons.menu}
        </button>
    );
});

export default MenuButton;