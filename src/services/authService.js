import {$api} from "../http";
import {authUserAction, checkUserAction} from "../store/reducers/user/user-reducer";
import {useAuth} from "../hooks/useAuth";
import axios from "axios";


export const login = (bot_id, user_id) => {
    return async function (dispatch){
        localStorage.setItem("bot_id", bot_id);
        const {data} =  await axios.get(`${process.env.REACT_APP_API_URL}${bot_id}/auth/login?user_id=${user_id}`)
        localStorage.setItem("accessToken", data.data.token);
        localStorage.setItem("refreshToken", data.data.refresh_token);
        dispatch(authUserAction(data.data));
    }
}
export const check = (user_id) => {
    return async function (dispatch){
        dispatch(checkUserAction({isLogin: true}));
    }
}


