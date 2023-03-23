import React, {useEffect} from 'react';
import {icons} from "../icons";
import {NavLink} from "react-router-dom";
import ContactsStore from "../../store/settings/ContactsStore";
import {observer} from "mobx-react-lite";

const BarContactsPanel = observer(() => {

    useEffect(()=>{
        if(ContactsStore.isLoading){
            ContactsStore.fetchContacts()
        }
    },[]);
    return (
        <NavLink to={'/contacts'} className={'bar-contacts'}>
            <div className="bar-contacts__content">
                <div className="bar-contacts__title">
                    {ContactsStore.info.phone ? ContactsStore.info.phone : "Наши контакты"}
                </div>
                <div className="bar-contacts__subtitle">
                    {ContactsStore.info.address}
                </div>
            </div>
            {icons.arrow_right_2}
        </NavLink>
    );
});

export default BarContactsPanel;