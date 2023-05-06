import {makeAutoObservable} from "mobx";
import {$api} from "../../../http";

class ApartmentStore {
    item = {
        id:null,
        image:null,
        title:null,
        description:null,
        category:null,
        price:null,
        quantity:null,
        not_available_dates:[],
    }

    constructor() {
        makeAutoObservable(this)
    }

    async fetchApartment(product_id) {
        await $api.get(`${localStorage.getItem('bot_id')}/apartments/${product_id}`).then(({data})=>{
            this.isLoading = false;
            this.item = {
                ...data.data,
            }
        });
    }
    async unsetApartment(){
        this.item = {
            id:null,
            image:null,
            title:null,
            description:null,
            category:null,
            price:null,
            skus:null,
        }
        this.isLoading = true;
    }

}
export default new ApartmentStore();