const tg = window.Telegram.WebApp;
export function useTelegram(){
    const onClose = () =>{
        tg.close()
    }
    const onToggleButton = () =>{
        if(tg.MainButton.isVisible){
            tg.MainButton.hide();
        }else{
            tg.MainButton.show();
        }
    }
    const showMainButton = (props) =>{
        tg.MainButton.setParams(props);
        tg.MainButton.show();
    }
    return {
        tg,
        user:tg.initDataUnsafe?.user,
        onClose,
        onToggleButton,
        showMainButton
    }
}

