import {action, makeAutoObservable} from "mobx";
import {$api} from "../../http";

class CategoriesStore {
    isLoading = true
    categories = []

    constructor() {
        makeAutoObservable(this)
    }

    async fetchCategories(alias) {
        await $api.get(`${localStorage.getItem('bot_id')}/categories`).then(({data}) => {
            this.isLoading = false;
            const filteredCategories = data.data.filter((item) => (item.alias === alias));
            if (filteredCategories && filteredCategories.length) {
                this.categories = filteredCategories[0].sub
            } else {
                this.categories = []
            }
        });
    }

    unsetCategories() {
        this.categories = [];
    }

}

export default new CategoriesStore();