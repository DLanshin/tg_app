import React, {useEffect, useState} from 'react';
import avatarImg from "../../assets/images/avatar.png";
import {useTelegram} from "../../hooks/useTelegram";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo} from "../../api/user";

const UserAvatar = (props) => {
    const {quantity} = useSelector(state => state.cart),
        {name} = useSelector(state => state.user_info),
        dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getUserInfo());
    },[])
    return (
        <NavLink to='/profile' className={'user-avatar '+props.className}>
            <span className={'cart-count'}>{quantity}</span>
            <img src={avatarImg} alt={name}/>
        </NavLink>
    );
};

export default UserAvatar;