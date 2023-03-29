const tg = window.Telegram.WebApp;
export function useTelegram(){
    const onClose = () =>{
        tg?.close()
    }

    const showMainButton = (props) =>{
        tg?.MainButton.setParams(props);
        tg?.MainButton.show();
    }
    const showTelegramAlert = (message, callback) =>{
        tg?.showAlert(message, callback)
    }
    const showTelegramConfirm = (message, callback) => {
        tg?.showConfirm(message,callback)
    }
    const expandApp = () =>{
        tg?.expand()
    }
    return {
        tg,
        user:tg.initDataUnsafe?.user,
        onClose,
        showMainButton,
        showTelegramConfirm,
        showTelegramAlert,
        expandApp
    }
}

