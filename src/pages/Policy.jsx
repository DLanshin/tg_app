import React, {useEffect} from 'react';
import ContactsStore from "../store/settings/ContactsStore";
import {observer} from "mobx-react-lite";



const Policy = observer(() => {
    const {policy_text} = ContactsStore.info;



    useEffect(()=>{
        if(!policy_text) {
            ContactsStore.fetchContacts();
        }
    },[]);
    return (
        <div className="policy">
            <div className="policy__title">
                Политика конфиденциальности
            </div>
            <div className="policy__text" dangerouslySetInnerHTML={{__html: policy_text}}></div>
        </div>
    );
});
export default Policy;