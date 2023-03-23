import axios from "axios";
import UserStore from "../store/user/UserStore";
import {useTelegram} from "../hooks/useTelegram";


const $api = axios.create({
    withCredentials: true,
    baseURL:`${process.env.REACT_APP_API_URL}`
});
const authInterceptor = config => {
    if(localStorage.getItem('accessToken')){
        config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`
    }
    return config;
}

$api.interceptors.request.use(authInterceptor);

$api.interceptors.response.use((config) => {
    return config;
},(async error => {
    const {showTelegramAlert} = useTelegram()
    const originalRequest = error.config;

    if (error.response?.status === 401) {
        try {
            const bot_id = localStorage.getItem('bot_id'),
                refreshToken = localStorage.getItem('refreshToken'),
                {data} = await $api.get(`${process.env.REACT_APP_API_URL}${bot_id}/auth/refresh?refresh_token=${refreshToken}`);
            localStorage.setItem("accessToken", data.data.token);
            localStorage.setItem("refreshToken", data.data.refresh_token);
            return $api.request(originalRequest);
        }catch (e){
            UserStore.logout()
            console.log("Ошибка авторизации");
        }
    }
    showTelegramAlert("Произошла непредвиденная ошибка, попробуйте позже");
    UserStore.setErrors({axios:$api, error:error});
}));

export {
    $api
};

