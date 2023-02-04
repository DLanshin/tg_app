import React from 'react';
import {useTelegram} from "../hooks/useTelegram";

const Profile = (props) => {
    const {user} = useTelegram();
    return (
        <div className={'profile'}>
            <img src={user?.photo} className="profile__image" alt={user?.name}/>
            <div className="profile__name">
                {user?.name}
                wqeqwe
                {JSON.stringify(user)}
            </div>
        </div>
    );
};

export default Profile;