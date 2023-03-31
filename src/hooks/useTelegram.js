const tg = window.Telegram.WebApp;
export function useTelegram(){
    const onClose = () =>{
        tg?.close()
    }

    const showMainButton = (props, onClick) =>{
        if(props.is_visible){
            tg?.MainButton.setParams(props);
            tg.MainButton.onClick(onClick);
            tg?.MainButton.show();
        }else{
            tg?.MainButton.hide();
        }
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
    const initBackButton = (isShow, onClick) => {
        tg?.BackButton.onClick(onClick)
        if(isShow){
            tg?.BackButton.show()
        }else{
            tg?.BackButton.hide()
        }
    }
    return {
        tg,
        user:tg.initDataUnsafe?.user,
        onClose,
        showMainButton,
        showTelegramConfirm,
        showTelegramAlert,
        expandApp,
        initBackButton
    }
}

