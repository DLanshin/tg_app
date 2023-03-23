const tg = window.Telegram.WebApp;
export function useTelegram(){
    const onClose = () =>{
        tg.close()
    }

    const showMainButton = (props) =>{
        tg.MainButton.setParams(props);
        tg.MainButton.show();
    }
    const showTelegramAlert = message =>{
        tg.showAlert(message)
    }
    const expandApp = () =>{
        tg.expand()
    }
    return {
        tg,
        user:tg.initDataUnsafe?.user,
        onClose,
        showMainButton,
        showTelegramAlert,
        expandApp
    }
}

