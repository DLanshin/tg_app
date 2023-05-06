import {action, makeAutoObservable} from "mobx";
import {$api} from "../../../http";

class ServiceStore {
    isLoading = true
    item = {
        id:null,
        image:null,
        title:null,
        description:null,
        category:null,
        price:null,
    }

    constructor() {
        makeAutoObservable(this)
    }

    async fetchServices(service_id) {
        await $api.get(`${localStorage.getItem('bot_id')}/services/${service_id}`).then(({data})=>{
            this.isLoading = false;
            this.item = {
                ...data.data,
            }
        });
    }
    async unsetService(){
        this.item = {
            id:null,
            image:null,
            title:null,
            description:null,
            category:null,
            price:null,
        }
        this.isLoading = true;
    }


}
export default new ServiceStore();