import axios from "axios";
import {fetchUserAction} from "../store/reducers/user/user-reducer";



export const getUserInfo = () => {
    return async function (dispatch){
        const userInfo = await axios.get('https://jsonplaceholder.typicode.com/users?id=1')
        dispatch(fetchUserAction(userInfo.data[0]));
    }
}
