import {makeAutoObservable} from "mobx";
import {$api} from "../../../http";

class ServiceCatalogStore {
    isLoading= true
    services= []
    filter = {
        category_id:null
    }
    constructor() {
        makeAutoObservable(this)
    }
    
    async fetchServiceCatalog() {
        this.isLoading = true;
        let getRequest = "";
        console.log(this.filter.category_id)
        if(this.filter.category_id){
            getRequest = `?category_id=${this.filter.category_id}`;
        }
        await $api.get(`${localStorage.getItem('bot_id')}/services${getRequest}`).then(({data})=>{
            this.isLoading = false;
            this.services = data.data;
        });
    }

    setFilter(filter){
        this.filter = filter
    }
}
export default new ServiceCatalogStore();