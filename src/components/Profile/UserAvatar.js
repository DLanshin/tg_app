import React from 'react';
import avatarImg from "../../assets/images/avatar.png";
import {useTelegram} from "../../hooks/useTelegram";

const UserAvatar = (props) => {
    const {user} = useTelegram();
    return (
        <div className={'user-avatar '+props.className}>
            <img src={user?.photo_url ? user.photo_url : avatarImg} alt={user?.name}/>
        </div>
    );
};

export default UserAvatar;