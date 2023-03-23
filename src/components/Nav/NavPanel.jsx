import React, {useEffect} from 'react';


import CategoryList from "../Catalog/Category/CategoryList";
import BarContactsPanel from "../Bar/BarContactsPanel";

const NavPanel = (props) => {
    let component = null,
        containerClasses = "";
    switch (props?.type){
        case "catalog":
            containerClasses = 'top-panel--bg-color';
            component = <CategoryList/>;
            break;
        case "contacts":
            component = <BarContactsPanel/>;
            break;

    }
    return (
        <div className={'top-panel '+containerClasses}>
            {component}
        </div>
    );
};

export default NavPanel;