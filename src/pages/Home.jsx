import React, {useEffect} from 'react';
import ProductList from "../components/Catalog/Product/ProductList";
import {observer} from "mobx-react-lite";
import CartStore from "../store/cart/CartStore";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannersSlider from "../components/Banners/BannersSlider";
import ProductSlider from "../components/Catalog/Product/ProductSlider";
import ProductCatalogStore from "../store/catalog/products/ProductStore";
import BookingList from "../components/Catalog/Booking/BookingList";
import ApartmentCatalogStore from "../store/booking/apartments/ApartmentCatalogStore";
import ServiceCatalogStore from "../store/catalog/services/ServiceStore";
import {CART_ROUTE, SERVICE_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import BotStore from "../store/bot/BotStore";


const Home = observer(() => {
    const {modules} = BotStore;
    const {services} = ServiceCatalogStore;
    const {products, popular} = ProductCatalogStore;
    const {apartments} = ApartmentCatalogStore;
    const navigate = useNavigate();


    useEffect(() => {
        ProductCatalogStore.fetchCatalog()
            .then(() => {if(modules?.services?.active) ServiceCatalogStore.fetchServiceCatalog()})
            .then(() => CartStore.fetchCart())
            .then(() => {if(modules?.booking?.active)ApartmentCatalogStore.fetchApartmentsCatalog()})
            .then(()=>{
                showMainButton({
                    text: `В корзине ${CartStore.quality} товаров`,
                    is_visible: !!CartStore.quality,
                }, () => {navigate(CART_ROUTE)})
            })
    }, [])

    return (
        <div className="container">
            {modules?.services?.active && services.length > 2 ?
                <ProductSlider
                    title={"Наши услуги"}
                    urlRule={SERVICE_ROUTE}
                    products={services}/>
                : null
            }

            <BannersSlider/>
            {modules?.booking?.active && apartments.length ?
                <BookingList
                    items={apartments}
                    type={'line'}
                    emptyText={"Товары не найдены"}
                />
                : null
            }

            {modules?.products?.active && products.length ?
                <ProductList
                    products={products}

                    emptyText={"Товары не найдены"}
                /> : null
            }

        </div>
    );
});
export default Home;