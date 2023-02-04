import React from 'react';
import UserAvatar from "../Profile/UserAvatar";
import CategoryList from "./CategoryList";

const CatalogNavPanel = (props) => {
    return (
        <div className={'nav-panel'}>
            <CategoryList category={props.categories}/>
            <UserAvatar className={'small conic-gradient'}/>
        </div>
    );
};

export default CatalogNavPanel;