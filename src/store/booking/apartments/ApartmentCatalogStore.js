import {makeAutoObservable} from "mobx";
import {$api} from "../../../http";

class ApartmentCatalogStore {
    isLoading= true
    apartments= []
    filter = {
        category_id:null,
        quantity:null,
        date_start:null,
        date_end:null,

    }
    constructor() {
        makeAutoObservable(this)
    }

    async fetchApartmentsCatalog() {
        this.isLoading = true;
        let searchParams = {};

        if(this.filter.category_id){
            searchParams.category_id = this.filter.category_id;
        }
        if(this.filter.quantity){
            searchParams.quantity = this.filter.quantity;
        }
        if(this.filter.date_start){
            let date_start = new Date(this.filter.date_start);
            date_start = new Intl.DateTimeFormat('ru-Ru').format(date_start)
            searchParams.date_start = date_start;
        }
        if(this.filter.date_end){
            let date_end = new Date(this.filter.date_end);
            date_end = new Intl.DateTimeFormat('ru-Ru').format(date_end)
            searchParams.date_end = date_end;
        }
        const getRequest = new URLSearchParams(searchParams);

        await $api.get(`${localStorage.getItem('bot_id')}/apartments?${getRequest.toString()}`).then(({data})=>{
            this.isLoading = false;
            this.apartments = data.data;
        });
    }

    setFilter(filter){
        this.filter = filter
    }
}
export default new ApartmentCatalogStore();