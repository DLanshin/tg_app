import React, {useEffect} from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import {useDispatch, useSelector} from "react-redux";
import {Link, NavLink} from "react-router-dom";
import {icons} from "../components/icons";
import {getContacts} from "../services/contactsApi";
import Social from "../components/Social/Social";
import {POLICY_ROUTE} from "../utils/consts";


const Contacts = () => {
    const dispatch = useDispatch(),
        contacts = useSelector(state => state.contacts);
    let defaultState = null;
    useEffect(()=>{
        dispatch(getContacts());

    },[]);

    if(contacts.geo_lat && contacts.geo_lon){
        defaultState = {
            center: [contacts.geo_lat, contacts.geo_lon],
            zoom: 12,
        };
    }
    const socials = [
        {
            name:'vk',
            link:contacts.vk
        },
        {
            name:'instagram',
            link:contacts.instagram
        },
        {
            name:'youtube',
            link:contacts.youtube
        }
    ];

    return (
        <div className={'contacts'}>
            <div className="contacts__map">
                {
                    defaultState ?
                        <YMaps>
                            <Map defaultState={defaultState} width={'100%'} height={'70vh'}>
                                <Placemark geometry={[contacts.geo_lat, contacts.geo_lon]} />
                            </Map>
                        </YMaps>:""
                }
            </div>
            <div className="contacts__info">
                <div className="contacts__info-row">
                    {
                        contacts.address ?
                            <div className="contacts__info-header">
                                {contacts.address}
                            </div>
                            :
                            <div className="contacts__info-header">
                                Адрес не указан
                            </div>
                    }
                    {
                        contacts.phone ?
                            <Link to={'tel:'+contacts.phone} className="contacts__info-phone">
                                {icons.phone}
                            </Link>:""
                    }
                </div>
                {
                    contacts.email ?
                        <Link to={'mailto:'+contacts.email} className="contacts__info-item">
                            {icons.mail}
                            <span>{contacts.email}</span>
                        </Link>:""
                }
                {
                    contacts.site ?
                        <Link to={contacts.site} className="contacts__info-item">
                            {icons.site}
                            <span>{contacts.site}</span>
                        </Link>:""
                }
                <Social socials={socials}/>
                <NavLink to={POLICY_ROUTE} className="contacts__info-button">Политика конфиденциальности</NavLink>
            </div>
        </div>
    );
};

export default Contacts;