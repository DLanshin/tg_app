import {makeAutoObservable} from "mobx";

class AppStore {
    menu= {
        open:false
    }
    constructor() {
        makeAutoObservable(this)
    }

    toggleMenu(isOpen){
        this.menu.open = isOpen
    }

}
export default new AppStore();