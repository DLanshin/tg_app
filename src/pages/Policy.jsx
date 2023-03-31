import React, {useEffect} from 'react';
import ContactsStore from "../store/settings/ContactsStore";
import {observer} from "mobx-react-lite";
import {icons} from "../components/icons";


const Policy = observer(() => {
    const {policy_text} = ContactsStore.info;


    useEffect(() => {
        if (!policy_text) {
            ContactsStore.fetchContacts();
        }
    }, []);
    return (
        <div className="policy container">
            <div className="block-list">
                <div className="block-list__body">
                    <div className="list">
                        <div className="list__item">
                            <div className="policy__text" dangerouslySetInnerHTML={{__html: policy_text}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
export default Policy;