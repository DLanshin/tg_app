import React from 'react';
import {useTelegram} from "../hooks/useTelegram";
import avatarImg from "../assets/images/avatar.png"

const Profile = (props) => {
    const {user} = useTelegram();
    return (
        <div className={'profile'}>
            <img src={user?.photo_url ? user.photo_url : avatarImg} className="profile__image" alt={user?.name}/>
            <div className="profile__content">
                <div className="profile__title">
                    {user?.first_name} {user?.last_name} qwdsa as sa
                </div>
                <div className="profile__subtitle">
                    qwdsa as sa
                </div>
            </div>
        </div>
    );
};

export default Profile;