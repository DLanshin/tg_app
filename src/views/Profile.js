import React from 'react';
import {useTelegram} from "../hooks/useTelegram";
import UserInfo from "../components/Profile/UserInfo";
import List from "../components/List/List";
import catalogIcon from "../assets/images/icons/coffee.svg";
import basketIcon from "../assets/images/icons/basket.svg";
import orderIcon from "../assets/images/icons/order.svg";
import closeIcon from "../assets/images/icons/close.svg";
import { ReactSVG } from 'react-svg'


const Profile = (props) => {
    const {user, onClose} = useTelegram();
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
            <div className="grid-list">
                <div className="grid-list__item">
                    <div className="grid-list__icon">
                        <ReactSVG src={catalogIcon} />
                    </div>
                    <div className="grid-list__text">
                        Каталог
                    </div>
                </div>
                <div className="grid-list__item">
                    <div className="grid-list__icon">
                        <span className="grid-list__hint">0</span>
                        <ReactSVG src={basketIcon}/>
                    </div>
                    <div className="grid-list__text">
                        Корзина
                    </div>
                </div>
                <div className="grid-list__item">
                    <div className="grid-list__icon">
                        <span className="grid-list__hint">0</span>
                        <ReactSVG src={orderIcon}/>
                    </div>
                    <div className="grid-list__text">
                        Мои заказы
                    </div>
                </div>
                <div className="grid-list__item" onClick={onClose}>
                    <div className="grid-list__icon">
                        <ReactSVG src={closeIcon}/>
                    </div>
                    <div className="grid-list__text">
                        Закрыть
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;