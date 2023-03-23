import {action, makeAutoObservable} from "mobx";
import {$api} from "../../http";

class ContactsStore {
    isLoading= true
    info = {
        address:null,
        email:null,
        geo_lat:null,
        geo_lon:null,
        instagram:null,
        phone:null,
        policy_text:null,
        site:null,
        vk:null,
        youtube:null,
    }
    constructor() {
        makeAutoObservable(this)
    }
    
    async fetchContacts() {
        await $api.get(`${localStorage.getItem('bot_id')}/setting/contacts`).then(({data})=>{
            this.isLoading = false;
            this.info = {...data.data};
        });

    }
}
export default new ContactsStore();