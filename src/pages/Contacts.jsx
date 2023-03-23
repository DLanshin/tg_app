import React, {useEffect} from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import {Link, NavLink} from "react-router-dom";
import {icons} from "../components/icons";
import Social from "../components/Social/Social";
import {POLICY_ROUTE} from "../utils/consts";
import contacts from "../store/settings/ContactsStore";
import ContactsStore from "../store/settings/ContactsStore";
import {observer} from "mobx-react-lite";


const Contacts = observer(() => {
    const info = ContactsStore.info;

    useEffect(()=>{
        if(ContactsStore.isLoading){
            ContactsStore.fetchContacts()
        }
    },[])
    let defaultState = null;

    if(info.geo_lat && info.geo_lon){
        defaultState = {
            center: [info.geo_lat, info.geo_lon],
            zoom: 12,
        };
    }
    const socials = [
        {
            name:'vk',
            link:info.vk
        },
        {
            name:'instagram',
            link:info.instagram
        },
        {
            name:'youtube',
            link:info.youtube
        }
    ];

    return (
        <div className={'contacts'}>
            <div className="contacts__map">
                {
                    defaultState ?
                        <YMaps>
                            <Map defaultState={defaultState} width={'100%'} height={'70vh'}>
                                <Placemark geometry={[info.geo_lat, info.geo_lon]} />
                            </Map>
                        </YMaps>:""
                }
            </div>
            <div className="contacts__info">
                <div className="contacts__info-row">
                    {
                        info.address ?
                            <div className="contacts__info-header">
                                {info.address}
                            </div>
                            :
                            <div className="contacts__info-header">
                                Адрес не указан
                            </div>
                    }
                    {
                        info.phone ?
                            <Link to={'tel:'+info.phone} className="contacts__info-phone">
                                {icons.phone}
                            </Link>:""
                    }
                </div>
                {
                    info.email ?
                        <Link to={'mailto:'+info.email} className="contacts__info-item">
                            {icons.mail}
                            <span>{info.email}</span>
                        </Link>:""
                }
                {
                    info.site ?
                        <Link to={info.site} className="contacts__info-item">
                            {icons.site}
                            <span>{info.site}</span>
                        </Link>:""
                }
                <Social socials={socials}/>
                <NavLink to={POLICY_ROUTE} className="contacts__info-button">Политика конфиденциальности</NavLink>
            </div>
        </div>
    );
});

export default Contacts;