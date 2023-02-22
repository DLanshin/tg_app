import React, {useEffect} from 'react';
import avatarImg from "../../assets/images/avatar.png";
import {useTelegram} from "../../hooks/useTelegram";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo} from "../../api/user";

const UserInfo = (props) => {
    const {id, name} = useSelector(state => state.user_info),
        dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getUserInfo());
    },[])
    return (
        <div className={'user-info'}>
            <img src={avatarImg} className="user-info__image" alt={name}/>
            <div className="user-info__content">
                <div className="user-info__title">
                    {name}
                </div>
                <div className="user-info__subtitle">
                    {name}
                </div>
            </div>
        </div>
    );
};

export default UserInfo;