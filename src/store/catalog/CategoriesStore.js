import {action, makeAutoObservable} from "mobx";
import {$api} from "../../http";

class CategoriesStore {
    isLoading = true
    categories = []
    constructor() {
        makeAutoObservable(this)
    }
    
    fetchCategories() {
        $api.get(`${localStorage.getItem('bot_id')}/categories`).then(({data})=>{
            this.isLoading = false;
            this.categories = data.data;
        });

    }
}
export default new CategoriesStore();