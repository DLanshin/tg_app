import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import CartStore from "../../store/cart/CartStore";
import OrderInfo from "../../components/Order/OrderInfo";
import OrderSettingsStore from "../../store/order/OrderSettingsStore";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import ru from 'react-phone-input-2/lang/ru.json';
import Button from "../../components/Button/Button";
import RadioGroup from "../../components/Form/RadioGroup";
import Input from "../../components/Form/Input";
import OrdersStore from "../../store/order/OrdersStore";
import { useTelegram } from "../../hooks/useTelegram";
import { icons } from "../../components/icons";
import Spinner from "../../components/Loaders/Spinner";
import UserStore from "../../store/user/UserStore";
import Radio from "../../components/Form/Radio";
import BotStore from "../../store/bot/BotStore";
import MiniCart from "../../components/Cart/MiniCart";

const receiversList = [
    {
        id: 1,
        name: "Для себя",
        slug: "me",
        default: true,
    },
    {
        id: 2,
        name: "Другому человеку",
        slug: "other"
    }
];
const shippingDateSwitcherList = [
    {
        id: 1,
        name: "Как можно быстрее",
        slug: "now",
        default: true,
    },
    {
        id: 2,
        name: "Выбрать время",
        slug: "time"
    }
];

const MakeOrder = observer((props) => {
    const [shippingMethod, setShippingMethod] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [receiverMethod, setReceiverMethod] = useState(receiversList[0]);
    const [shippingDateMethod, setShippingDateMethod] = useState(shippingDateSwitcherList[0]);
    const [isPayBonuses, setIsPayBonuses] = useState(false);
    const [payBonusesSum, setPayBonusesSum] = useState(0);

    const { showMainButton, closeApp } = useTelegram();
    const [phone, setPhone] = useState("");
    // const [address, setAddress] = useState("");
    const [receiverName, setReceiverName] = useState("");
    const [shippingDate, setShippingDate] = useState("");
    const [comment, setComment] = useState("");
    const [distance, setDistance] = useState("");


    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [directionsService, setDirectionsService] = useState(null);
    const [directionsDisplay, setDirectionsDisplay] = useState(null);
    const [startLocation, setStartLocation] = useState('');
    const [address, setEndLocation] = useState('');

    const { products } = CartStore;

    const {
        price_type,
        delivery_fix_price,
        min_order_price,
        delivery_methods,
        pickup_paying_methods,
        delivery_paying_methods
    } = BotStore.delivery;
    const { loyalty } = BotStore;

    useEffect(() => {
        showMainButton({ is_visible: false });
        BotStore.fetchSettings()
            .then(() => CartStore.fetchCart())
            .then(() => {
                setReceiverMethod(receiversList[0]);
            });
    }, []);

    useEffect(() => {
        setShippingMethod(delivery_methods[0]);
        setPaymentMethod(shippingMethod?.slug === 'pickup' || shippingMethod?.slug === 'inhouse' ? pickup_paying_methods[0] : delivery_paying_methods[0]);
    }, [delivery_methods]);

    useEffect(() => {
        if (shippingDateMethod.slug === 'time') {
            setShippingDate(getDefaultDate());
        }
    }, [shippingDateMethod]);

    useEffect(() => {
        if (address) {
            calculateDistance();
        }
    }, [address]);


    useEffect(() => {
        const initMap = () => {
            const mapInstance = new window.google.maps.Map(mapRef.current, {
                zoom: 7,
                center: { lat: 41.85, lng: -87.65 },
            });
            setMap(mapInstance);

            const directionsServiceInstance = new window.google.maps.DirectionsService();
            const directionsDisplayInstance = new window.google.maps.DirectionsRenderer();
            directionsDisplayInstance.setMap(mapInstance);

            setDirectionsService(directionsServiceInstance);
            setDirectionsDisplay(directionsDisplayInstance);

            getCurrentLocation((loc) => {
                if (loc) {
                    setStartLocation(loc.toString());
                    mapInstance.setCenter(loc);
                } else {
                    alert('Current location not found');
                }
            });
        };

        const getCurrentLocation = (complete) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const location = new window.google.maps.LatLng(
                            position.coords.latitude,
                            position.coords.longitude
                        );
                        complete(location);
                    },
                    () => {
                        complete(null);
                    }
                );
            } else {
                complete(null);
            }
        };

        window.initMap = initMap;

        // Load the Google Maps script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?callback=initMap`;
        script.async = true;
        document.head.appendChild(script);

        return () => {
            // Cleanup script tag if component unmounts
            document.head.removeChild(script);
        };
    }, []);

    const calculateAndDisplayRoute = (address) => {
        if (directionsService && directionsDisplay) {
            directionsService.route(
                {
                    origin: startLocation,
                    destination: address,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (response, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                    } else {
                        window.alert('Directions request failed due to ' + status);
                    }
                }
            );
        }
    };

    const createOrderHandler = (event) => {
        event.preventDefault();
        let date = null;
        if (shippingDate) {
            date = new Date(shippingDate);
            date = new Intl.DateTimeFormat('ru-RU').format(date) + " " + date.getHours() + ":" + date.getMinutes();
        }
        if (!phone) {
            event.target.phone.classList.add("invalid");
        } else {
            event.target.phone.classList.remove("invalid");
            OrdersStore.createOrder({
                shipping_method_id: shippingMethod.id,
                payment_method_id: paymentMethod.id,
                shipping_phone: phone,
                shipping_address: address,
                shipping_name: receiverName,
                shipping_date: date,
                comment: comment,
                pay_bonuses_sum: payBonusesSum
            }).then(() => {
                closeApp();
            });
        }
    };

    const getDefaultDate = () => {
        let local = new Date();
        return local.toJSON().slice(0, 16);
    };

    const handlerIsPayBonuses = () => {
        setIsPayBonuses(!isPayBonuses);
        setPayBonusesSum(!isPayBonuses ? parseInt(CartStore.total_price * loyalty.available_bonus_payments / 100) : 0);
    };

    // const calculateDistance = () => {
    //     ymaps.ready(() => {
    //         var geocoder = ymaps.geocode(address);

    //         geocoder.then((res) => {
    //             if (res.geoObjects.get(0)) {
    //                 var originCoords = res.geoObjects.get(0).geometry.getCoordinates();
    //                 var destinationCoords = [55.751426, 37.618879];

    //                 var multiRoute = new ymaps.multiRouter.MultiRoute({
    //                     referencePoints: [
    //                         originCoords,
    //                         destinationCoords
    //                     ],
    //                     params: {
    //                         routingMode: 'auto'
    //                     }
    //                 }, {
    //                     boundsAutoApply: true
    //                 });

    //                 multiRoute.model.events.add('requestsuccess', function () {
    //                     var distanceText = multiRoute.getRoutes().get(0).properties.get("distance").text;
    //                     setDistance(distanceText);
    //                 });
    //             } else {
    //                 setDistance("Адрес не найден");
    //             }
    //         });
    //     });
    // };

    if (BotStore.isLoading || CartStore.isLoading) {
        return <Spinner />;
    } else if (!CartStore.quality) {
        return (
            <div className={'empty opacity-4'}>
                {icons.cart}
                <div className="empty__text">
                    Ваша корзина пуста, добавьте товары в корзину
                </div>
            </div>
        );
    }

    return (
        <form className={"order"} onSubmit={createOrderHandler}>
            <div className={"form-block"}>
                <div className={"form-block__title"}>Способы доставки</div>
                <RadioGroup
                    required={true}
                    name={"shipping_method"}
                    type={"radio"}
                    elements={delivery_methods}
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
                    elements={shippingMethod?.slug === 'pickup' || shippingMethod?.slug === 'inhouse' ? pickup_paying_methods : delivery_paying_methods}
                    value={paymentMethod}
                    setValue={setPaymentMethod}
                />
            </div>
            <div className={"form-block"}>
                <div className={"form-block__title"}>Для кого</div>
                <RadioGroup
                    listType={'horizontal'}
                    required={true}
                    name={"shipping_name"}
                    type={"radio"}
                    elements={receiversList}
                    value={receiverMethod}
                    setValue={setReceiverMethod}
                />
            </div>
            <div className={"form-block"}>
                {receiverMethod?.slug === 'other' ? (
                    <Input
                        required={true}
                        type={"text"}
                        name={"receiver_name"}
                        placeholder={"Имя получателя"}
                        value={receiverName}
                        onChange={setReceiverName}
                    />
                ) : null}
            </div>
            <div className={"form-block"}>
                <div className={"form-block__title"}>Когда доставить</div>
                <RadioGroup
                    listType={'horizontal'}
                    required={true}
                    name={"shipping_date_switcher"}
                    type={"radio"}
                    elements={shippingDateSwitcherList}
                    value={shippingDateMethod}
                    setValue={setShippingDateMethod}
                />
            </div>
            <div className={"form-block"}>
                {shippingDateMethod?.slug === 'time' ? (
                    <Input
                        required={true}
                        type={"datetime-local"}
                        name={"shipping_date"}
                        placeholder={"Выберите дату"}
                        min={getDefaultDate()}
                        value={shippingDate}
                        onChange={setShippingDate}
                    />
                ) : null}
            </div>
            {loyalty?.active ? (
                <div className={"form-block"}>
                    <Radio
                        required={false}
                        name={"pay_bonuses"}
                        type={"checkbox"}
                        item={{ slug: 'pay_bonus', name: `Оплатить бонусами - ${UserStore.bonus} баллов` }}
                        value={isPayBonuses}
                        onChange={handlerIsPayBonuses}
                    />
                </div>
            ) : null}
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
                        shippingMethod?.slug !== 'pickup' && shippingMethod?.slug !== 'inhouse' ?
                            <Input
                                required={true}
                                type={"text"}
                                name={"address"}
                                placeholder={"Куда доставить"}
                                value={address}
                                // onChange={setEndLocation(e.target.value)}
                                onChange={calculateAndDisplayRoute(address)}
                            /> : null
                    }
                    <div id="map" ref={mapRef} style={{ height: '100vh' }}></div>
                    <Input
                        type={"text"}
                        name={"comment"}
                        placeholder={"Комментарий"}
                        value={comment}
                        onChange={setComment}
                    />
                    {
                        distance && (
                            <div>
                                <b>Расстояние:</b> {distance}
                            </div>
                        )
                    }
                </div>
            </div>
            <OrderInfo
                totalPrice={CartStore.total_price}
                payBonusSum={payBonusesSum}
                deliveryPrice={price_type.slug === 'fix' && shippingMethod?.slug !== 'pickup' && shippingMethod?.slug !== 'inhouse' ? delivery_fix_price : 0}
            />
            <MiniCart elements={products} />
            {CartStore.total_price >= min_order_price ?
                <Button type={"submit"} className={'button-primary'}>Оформить заказ</Button>
                :
                <>Минимальная сумма заказа {min_order_price + " P"}</>
            }
        </form>
    );
});
export default MakeOrder;
