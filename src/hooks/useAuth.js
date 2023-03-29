const tg = window.Telegram.WebApp;
export function useAuth(){

    const checkAuth = (bot_id, user_id) => {
        return !!(checkBot(bot_id) && localStorage.getItem("accessToken"));
    }

    const checkBot = (bot_id) => {
        if(localStorage.getItem("bot_id")){
            return true;
        }else{
            _setBot(bot_id)
        }
    };
    const _setBot = (bot_id) => {
        if(bot_id){
            localStorage.setItem("bot_id", bot_id);
            return true;
        }else{
            return false;
        }
    };



    return {
        checkAuth,
        checkBot,
    }
}

