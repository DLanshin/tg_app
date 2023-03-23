import {makeAutoObservable} from "mobx";
import {$api} from "../../http";

class CatalogStore {
    isLoading= true
    products= []
    filter = {
        category_id:null
    }
    constructor() {
        makeAutoObservable(this)
    }
    
    async fetchCatalog() {
        this.isLoading = true;
        let getRequest = "";
        if(this.filter.category_id){
            getRequest = `?category_id=${this.filter.category_id}`;
        }
        await $api.get(`${localStorage.getItem('bot_id')}/products${getRequest}`).then(({data})=>{
            this.isLoading = false;
            this.products = data.data;
        });
    }
    setFilter(filter){
        this.filter = filter
    }
}
export default new CatalogStore();