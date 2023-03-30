import {makeAutoObservable} from "mobx";
import {$api} from "../../http";

class CatalogStore {
    isLoading= true
    products= []
    popular = []
    filter = {
        category_id:null
    }
    constructor() {
        makeAutoObservable(this)
    }
    
    async fetchCatalog() {
        this.isLoading = true;
        let getRequest = "";
        console.log(this.filter.category_id)
        if(this.filter.category_id){
            getRequest = `?category_id=${this.filter.category_id}`;
        }
        await $api.get(`${localStorage.getItem('bot_id')}/products${getRequest}`).then(({data})=>{
            this.isLoading = false;
            this.products = data.data;
            this.popular = this.products.filter((item)=>{
                if(item.popular) return item});
        });
    }

    setFilter(filter){
        this.filter = filter
    }
}
export default new CatalogStore();