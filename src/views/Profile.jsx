import React, {useEffect} from 'react';

import UserInfo from "../components/Profile/UserInfo";
import List from "../components/List/List";
import catalogIcon from "../assets/images/icons/coffee.svg";
import basketIcon from "../assets/images/icons/basket.svg";
import orderIcon from "../assets/images/icons/order.svg";
import closeIcon from "../assets/images/icons/close.svg";
import { ReactSVG } from 'react-svg'
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {getUserInfo} from "../api/user";


const Profile = (props) => {
    const {quantity} = useSelector(state=>state.cart),
            {id} = useSelector(state => state.user_info),
            dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getUserInfo());
    },[])

    const userInfoList = [
        {
            name:"ID",
            value:id
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
                <NavLink to="/" className="grid-list__item">
                    <div className="grid-list__icon">
                        <ReactSVG src={catalogIcon} />
                    </div>
                    <div className="grid-list__text">
                        Каталог
                    </div>
                </NavLink>
                <NavLink to="/cart" className="grid-list__item">
                    <div className="grid-list__icon">
                        <span className="grid-list__hint">{quantity}</span>
                        <ReactSVG src={basketIcon}/>
                    </div>
                    <div className="grid-list__text">
                        Корзина
                    </div>
                </NavLink>
                <NavLink to="/" className="grid-list__item">
                    <div className="grid-list__icon">
                        <span className="grid-list__hint">0</span>
                        <ReactSVG src={orderIcon}/>
                    </div>
                    <div className="grid-list__text">
                        Мои заказы
                    </div>
                </NavLink>
                <NavLink to="/" className="grid-list__item">
                    <div className="grid-list__icon">
                        <ReactSVG src={closeIcon}/>
                    </div>
                    <div className="grid-list__text">
                        Закрыть
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default Profile;