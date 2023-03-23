import {action, makeAutoObservable} from "mobx";
import {$api} from "../../http";

class ProductStore {
    isLoading = true
    item = {
        id:null,
        image:null,
        title:null,
        description:null,
        category:null,
        price:null,
        skus:null,
    }

    constructor() {
        makeAutoObservable(this)
    }

    async fetchProduct(product_id) {
        await $api.get(`${localStorage.getItem('bot_id')}/product/${product_id}`).then(({data})=>{
            this.isLoading = false;
            this.item = {
                ...data.data,
            }
        });
    }
    async unsetProduct(){
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
export default new ProductStore();