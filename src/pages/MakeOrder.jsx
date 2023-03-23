import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import CartStore from "../store/cart/CartStore";
import OrderInfo from "../components/Order/OrderInfo";
import OrderSettingsStore from "../store/order/OrderSettingsStore";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import ru from 'react-phone-input-2/lang/ru.json'
import Button from "../components/Button/Button";
import RadioGroup from "../components/Form/RadioGroup";
import Input from "../components/Form/Input";
import OrdersStore from "../store/order/OrdersStore";
import {useTelegram} from "../hooks/useTelegram";


const MakeOrder = observer((props) => {
    const [shippingMethod, setShippingMethod] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const {showTelegramAlert} = useTelegram();
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [comment, setComment] = useState("");
    useEffect(() => {
        OrderSettingsStore.fetchShippingMethods()
            .then(() => CartStore.fetchCart())
    }, [])
    const createOrderHandler = (event) => {
        event.preventDefault();
        OrdersStore.createOrder({
            shipping_method_id:shippingMethod.id,
            payment_method_id:paymentMethod.id,
            shipping_phone: phone,
            shipping_address: address,
            comment: comment,
        }).then(()=>{
            showTelegramAlert("Ваш заказ успешно создан и отправлен на обработку")
            CartStore.fetchCart()
        })
    }

    if(!CartStore.quality){
        return (
            <>Ваша корзина пуста, добавьте товары в корзину</>
        );
    }

    return (
        <form className={"order"} onSubmit={createOrderHandler}>
            <div className={"form-block"}>
                <div className={"form-block__title"}>Способы оплаты</div>
                <RadioGroup
                    required={true}
                    name={"shipping_method"}
                    type={"radio"}
                    elements={OrderSettingsStore.shippingMethods}
                    value={shippingMethod}
                    setValue={setShippingMethod}
                    />
            </div>
            <div className={"form-block"}>
                <div className={"form-block__title"}>Способы оплаты</div>
                <RadioGroup
                    required={true}
                    name={"payment_method"}
                    type={"radio"}
                    elements={shippingMethod?.slug === 'pickup' ? OrderSettingsStore.pickupPaymentsMethods : OrderSettingsStore.paymentsMethods}
                    value={paymentMethod}
                    setValue={setPaymentMethod}
                    />
            </div>
            <div className={"form-block"}>
                <div className={"form-block__title"}>Контактные данные</div>
                <div className={"form"}>
                    <PhoneInput
                        required={true}
                        placeholder={"+7 (___) ___-__-__"}
                        onlyCountries={["ru", "by", "kz"]}
                        localization={ru}
                        country={'ru'}
                        name={"phone"}
                        value={phone}
                        onChange={phone => setPhone(phone)}
                    />
                    <Input
                        required={true}
                        type={"text"}
                        name={"address"}
                        placeholder={"Адрес доставки"}
                        value={address}
                        onChange={setAddress}
                    />
                    <Input
                        type={"text"}
                        name={"comment"}
                        placeholder={"Комментарий"}
                        value={comment}
                        onChange={setComment}
                    />
                </div>
            </div>
            <OrderInfo totalPrice={CartStore.total_price} deliveryPrice={0}/>
            {CartStore.total_price >= OrderSettingsStore.min_order_price ?
                <Button type={"submit"} className={'button-primary'}>Оформить заказ</Button>:

                <>Минимальная сумма заказа {OrderSettingsStore.min_order_price+" P"}</>
            }

        </form>
    );
});
export default MakeOrder;