import React from 'react';
import UserAvatar from "../Profile/UserAvatar";

const CatalogNavPanel = (props) => {
    return (
        <div className={'nav-panel'}>
            <div></div>
            <UserAvatar className={'small conic-gradient'}/>
        </div>
    );
};

export default CatalogNavPanel;