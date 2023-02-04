import React from 'react';
import UserAvatar from "../Profile/UserAvatar";

const CatalogNavPanel = (props) => {
    return (
        <div className={'nav-panel'}>
            <UserAvatar className={'small'}/>
        </div>
    );
};

export default CatalogNavPanel;