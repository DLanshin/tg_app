import React from 'react';
import avatarImg from "../../../assets/images/avatar.png";
import {useTelegram} from "../../../hooks/useTelegram";

const UserInfo = (props) => {
    const {user} = useTelegram();
    return (
        <div className={'user-info'}>
            <img src={user?.photo_url ? user.photo_url : avatarImg} className="user-info__image" alt={user?.name}/>
            <div className="user-info__content">
                <div className="user-info__title">
                    {user?.first_name} {user?.last_name}
                </div>
                <div className="user-info__subtitle">
                    {user?.username}
                </div>
            </div>
        </div>
    );
};

export default UserInfo;