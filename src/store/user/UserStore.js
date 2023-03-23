import {action, makeAutoObservable} from "mobx";
import axios from "axios";
import {$api} from "../../http";

class UserStore {
    isAuth = false
    isLoading = true
    id = null
    name = null
    errors=null;
    constructor() {
        makeAutoObservable(this)
    }
    
    login(bot_id, user_id) {
        localStorage.setItem("bot_id", bot_id);
        $api.get(`${process.env.REACT_APP_API_URL}${bot_id}/auth/login?user_id=${user_id}`).then(({data})=>{
            localStorage.setItem("accessToken", data.data.token);
            localStorage.setItem("refreshToken", data.data.refresh_token);
            this.isAuth = true;
            this.isLoading = false;
        })
    }
    
    check(){
        this.isAuth= true;
        this.isLoading = false;
    }
    logout(){
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        this.isAuth=false;
    }
    setErrors (errors) {

        this.errors +=  JSON.stringify(errors, null, " ")
    }
}
export default new UserStore();