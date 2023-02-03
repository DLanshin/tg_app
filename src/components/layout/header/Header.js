import React, {useEffect} from 'react';
import Button from "../../common/button/Button";
import {useTelegram} from "../../hooks/useTelegram";



const Header = (props) => {
    const {tg, user, onClose} = useTelegram();
    return (
        <nav className={'navbar '+props.className}>
            <Button>Закрыть</Button>
            <span className={'username'}>
                {tg.initDataUnsafe?.user?.username}
            </span>
        </nav>
    );
};

export default Header;