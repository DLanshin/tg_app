const tg = window.Telegram.WebApp;
export function useTelegram(){
    const onClose = () =>{
        tg.close()
    }

    const showMainButton = (props) =>{
        tg.MainButton.setParams(props);
        tg.MainButton.show();
    }
    const showAlert = message =>{
        tg.showAlert(message)
    }
    return {
        tg,
        user:tg.initDataUnsafe?.user,
        onClose,
        showMainButton,
        showAlert
    }
}

