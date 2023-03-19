import {$api} from "../http";
import {fetchContactsAction} from "../store/reducers/settings/contacts-reducer";



export const getContacts = () => {
    return async function (dispatch) {
        const {data} = await $api.get(`${localStorage.getItem('bot_id')}/setting/contacts`);
        dispatch(fetchContactsAction(data.data));
    }
}