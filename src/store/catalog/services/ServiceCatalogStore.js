import {makeAutoObservable} from "mobx";
import {$api} from "../../../http";

class ServiceCatalogStore {
    isLoading= true
    services= []
    popular= []
    filter = {
        category_id:null
    }
    main_category_alias = "services"
    constructor() {
        makeAutoObservable(this)
    }
    
    async fetchServiceCatalog() {
        this.isLoading = true;
        let getRequest = "";
        if(this.filter.category_id){
            getRequest = `?category_id=${this.filter.category_id}`;
        }
        await $api.get(`${localStorage.getItem('bot_id')}/services${getRequest}`).then(({data})=>{
            this.isLoading = false;
            this.services = data.data;
            this.popular = this.services.filter((item)=>{if(item.popular) return item});

        });
    }

    setFilter(filter){
        this.filter = {
            ...this.filter,
            ...filter
        }
    }
}
export default new ServiceCatalogStore();