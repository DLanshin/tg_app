import {makeAutoObservable} from "mobx";
import {$api} from "../../../http";

class ProductCatalogStore {
    isLoading= true
    products= []
    popular = []
    filter = {
        category_id:null
    }
    main_category_alias = "products"

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
            this.popular = this.products.filter((item)=>{if(item.popular) return item});
        });
    }

    setFilter(filter){
        this.filter = {
            ...this.filter,
            filter
        }
    }
}
export default new ProductCatalogStore();