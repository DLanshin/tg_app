import React from 'react';
import {useSelector} from "react-redux";



const Policy = () => {
    const {policy_text} = useSelector(state => state.contacts)

    return (
        <div className="policy">
            <div className="policy__title">
                Политика конфиденциальности
            </div>
            <div className="policy__text">
                {policy_text}
            </div>
        </div>
    );
}
export default Policy;