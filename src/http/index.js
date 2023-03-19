import axios from "axios";

export const setBotID = bot_id =>{
    localStorage.setItem("bot_id", bot_id);
}

const $api = axios.create({
    withCredentials: false,
    baseURL:`${process.env.REACT_APP_API_URL}`
});
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config;
}

$api.interceptors.request.use(authInterceptor);

$api.interceptors.response.use((config) => {
    return config;
},(async error => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
        try {
            const bot_id = localStorage.getItem('bot_id'),
                refreshToken = localStorage.getItem('refreshToken'),
                {data} = await axios.get(`${process.env.REACT_APP_API_URL}${bot_id}/auth/refresh?refresh_token=${refreshToken}`);
            localStorage.setItem("accessToken", data.data.token);
            localStorage.setItem("refreshToken", data.data.refresh_token);
            return $api.request(originalRequest);
        }catch (e){
            console.log("Ошибка авторизации");
        }
    }

}));

export {
    $api
};

