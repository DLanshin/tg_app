import {action, makeAutoObservable} from "mobx";
import {$api} from "../../http";

class CategoriesStore {
    isLoading = true
    categories = []

    constructor() {
        makeAutoObservable(this)
    }

    async fetchCategories(alias) {
        await $api.get(`${localStorage.getItem('bot_id')}/categories/${alias}`).then(({data}) => {
            this.isLoading = false;
            this.categories = data.data;
        });
    }

    unsetCategories() {
        this.categories = [];
    }

}

export default new CategoriesStore();