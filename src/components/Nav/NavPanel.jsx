import React, {useEffect} from 'react';


import CategoryList from "../Catalog/Category/CategoryList";
import BarContactsPanel from "../Bar/BarContactsPanel";

const NavPanel = (props) => {
    let component = null;
    switch (props?.type){
        case "catalog":
            component = <CategoryList/>;
            break;
        case "contacts":
            component = <BarContactsPanel/>;
            break;

    }
    return (
        <div className={'top-panel'}>
            {component}
        </div>
    );
};

export default NavPanel;