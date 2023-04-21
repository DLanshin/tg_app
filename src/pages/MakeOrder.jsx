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


const receiversList = [
    {
        id:1,
        name:"Для себя",
        slug:"me",
        default:true,
    },
    {
        id:2,
        name:"Другому человеку",
        slug:"other"
    }
];
const shippingDateSwitcherList = [
    {
        id:1,
        name:"Как можно быстрее",
        slug:"now",
        default:true,
    },
    {
        id:2,
        name:"Выбрать время",
        slug:"time"
    }
];

const MakeOrder = observer((props) => {

    const [shippingMethod, setShippingMethod] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [receiverMethod, setReceiverMethod] = useState(receiversList[0]);
    const [shippingDateMethod, setShippingDateMethod] = useState(shippingDateSwitcherList[0]);


    const {showTelegramAlert} = useTelegram();
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [receiverName, setReceiverName] = useState("");
    const [shippingDate, setShippingDate] = useState("");
    const [comment, setComment] = useState("");
    const {
        price_type,
        fix_shipping_price,
        min_order_price,
        shippingMethods,
        pickupPaymentsMethods,
        paymentsMethods
    } = OrderSettingsStore;

    useEffect(() => {
        OrderSettingsStore.fetchShippingMethods()
            .then(() => CartStore.fetchCart())
            .then(() => {

                setReceiverMethod(receiversList[0])
            })
    }, []);
    useEffect(()=>{
        setShippingMethod(shippingMethods[0]);
        setPaymentMethod(shippingMethod?.slug === 'pickup' ? pickupPaymentsMethods[0] : paymentsMethods[0])
    },[shippingMethods]);

    useEffect(()=>{
        if(shippingDateMethod.slug === 'time'){
            setShippingDate(getDefaultDate())
        }
    },[shippingDateMethod])
    const createOrderHandler = (event) => {
        event.preventDefault();
        const date = null
        if(shippingDate){
            const date = new Date(shippingDate);
            let a = new Intl.DateTimeFormat('ru-Ru').format(date)+" "+date.getHours()+":"+date.getMinutes()

        }
        if(!phone){
            event.target.phone.classList.add("invalid");
        }else{
            event.target.phone.classList.remove("invalid");
            OrdersStore.createOrder({
                shipping_method_id:shippingMethod.id,
                payment_method_id:paymentMethod.id,
                shipping_phone: phone,
                shipping_address: address,
                shipping_name: receiverName,
                shipping_date: date,
                comment: comment,
            }).then(()=>{
                showTelegramAlert("Ваш заказ успешно создан и отправлен на обработку")
                CartStore.fetchCart()
            })
        }
    }
    const getDefaultDate = () => {
        let local = new Date();
        return local.toJSON().slice(0,16);
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
                    elements={shippingMethods}
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
                    elements={shippingMethod?.slug === 'pickup' ? pickupPaymentsMethods : paymentsMethods}
                    value={paymentMethod}
                    setValue={setPaymentMethod}
                    />
            </div>
            <div className={"form-block"}>
                <div className={"form-block__title"}>Для кого</div>
                <RadioGroup
                    required={true}
                    name={"shipping_name"}
                    type={"radio"}
                    elements={receiversList}
                    value={receiverMethod}
                    setValue={setReceiverMethod}
                />
            </div>
            <div className={"form-block"}>
                {
                    receiverMethod?.slug === 'other' ?
                        <Input
                            required={true}
                            type={"text"}
                            name={"receiver_name"}
                            placeholder={"Имя получателя"}
                            value={receiverName}
                            onChange={setReceiverName}
                        />: null
                }
            </div>

            <div className={"form-block"}>
                <div className={"form-block__title"}>Контактные данные</div>
                <div className={"form"}>
                    <PhoneInput
                        inputProps={{
                            name: 'phone',
                            required: true,
                        }}
                        defaultErrorMessage={"Обязательное поле для заполнения"}
                        placeholder={"+7 (___) ___-__-__"}
                        onlyCountries={["ru", "by", "kz"]}
                        localization={ru}
                        country={'ru'}
                        value={phone}
                        onChange={phone => setPhone(phone)}
                    />
                    {
                        shippingMethod?.slug !== 'pickup' ?
                            <Input
                                required={true}
                                type={"text"}
                                name={"address"}
                                placeholder={"Адрес доставки"}
                                value={address}
                                onChange={setAddress}
                            />: null
                    }

                    <Input
                        type={"text"}
                        name={"comment"}
                        placeholder={"Комментарий"}
                        value={comment}
                        onChange={setComment}
                    />
                </div>
            </div>
            <div className={"form-block"}>
                <div className={"form-block__title"}>Когда доставить</div>
                <RadioGroup
                    required={true}
                    name={"shipping_date_switcher"}
                    type={"radio"}
                    elements={shippingDateSwitcherList}
                    value={shippingDateMethod}
                    setValue={setShippingDateMethod}
                />
            </div>
            <div className={"form-block"}>
                {
                    shippingDateMethod?.slug === 'time' ?
                        <Input
                            required={true}
                            type={"datetime-local"}
                            name={"receiver_name"}
                            placeholder={"Выберите дату"}
                            min={getDefaultDate()}
                            value={shippingDate}
                            onChange={setShippingDate}
                        />: null
                }
            </div>
            <OrderInfo
                totalPrice={CartStore.total_price}
                deliveryPrice={price_type.slug === 'fix' ? fix_shipping_price : 0}/>
            {CartStore.total_price >= min_order_price ?
                <Button type={"submit"} className={'button-primary'}>Оформить заказ</Button>:

                <>Минимальная сумма заказа {min_order_price+" P"}</>
            }

        </form>
    );
});
export default MakeOrder;