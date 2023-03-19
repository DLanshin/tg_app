import React, {useEffect, useState} from 'react';
import {icons} from "../icons";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchContactsAction} from "../../store/reducers/settings/contacts-reducer";
import {getContacts} from "../../services/contactsApi";

const BarContactsPanel = () => {
    const dispatch = useDispatch(),
        {address, phone} = useSelector(state => state.contacts);
    useEffect(()=>{
        dispatch(getContacts());
    },[]);
    return (
        <NavLink to={'/contacts'} className={'bar-contacts'}>
            <div className="bar-contacts__content">
                <div className="bar-contacts__title">
                    {phone ? phone : "Наши контакты"}
                </div>
                <div className="bar-contacts__subtitle">
                    {address}
                </div>
            </div>
            {icons.arrow_right_2}
        </NavLink>
    );
};

export default BarContactsPanel;