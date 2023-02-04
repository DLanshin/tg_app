import React, {useEffect} from 'react';
import Button from "../../components/Button/Button";
import {useTelegram} from "../../hooks/useTelegram";



const Header = (props) => {
    const {user, onClose} = useTelegram();
    return (
        <nav className={'navbar '+props.className}>
            <Button onClick={onClose}>Закрыть</Button>
            <span className={'username'}>
                {user?.username}
            </span>
        </nav>
    );
};

export default Header;