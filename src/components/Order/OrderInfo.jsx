import React from 'react';

const OrderInfo = ({totalPrice, deliveryPrice}) => {
    return (
        <div className={"order-info"}>
            <div className={"order-info__item"}>
                <span>Сумма</span>
                <span>{totalPrice ? totalPrice+ " ₽": "-"}</span>
            </div>
            <div className={"order-info__item"}>
                <span>Доставка</span>
                <span>{deliveryPrice ? deliveryPrice+ " ₽": "-"}</span>
            </div>
        </div>
    );
};

export default OrderInfo;