import React from 'react';
import {useTelegram} from "../hooks/useTelegram";
import UserInfo from "../components/Profile/UserInfo/UserInfo";
import List from "../components/List/List";

const Profile = (props) => {
    const {user} = useTelegram();
    const userInfoList = [
        {
            name:"ID",
            value:user?.id
        },
        {
            name:"Количество заказов",
            value:0,
        },
        {
            name:"Приглашено друзей",
            value: 0
        },
    ];
    return (
        <div className={'profile'}>
            <UserInfo/>
            <List list={userInfoList}/>
        </div>
    );
};

export default Profile;