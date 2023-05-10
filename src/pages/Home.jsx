import React, {useEffect} from 'react';
import ProductList from "../components/Catalog/Product/ProductList";
import {observer} from "mobx-react-lite";
import CartStore from "../store/cart/CartStore";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannersSlider from "../components/Banners/BannersSlider";
import ProductSlider from "../components/Catalog/Product/ProductSlider";
import ProductCatalogStore from "../store/catalog/products/ProductCatalogStore";
import Tabs from "../components/Tabs/Tabs";
import BookingCatalog from "./Catalog/Booking/BookingCatalog";
import BookingList from "../components/Catalog/Booking/BookingList";
import ApartmentCatalogStore from "../store/booking/apartments/ApartmentCatalogStore";
import ServiceCatalogStore from "../store/catalog/services/ServiceCatalogStore";
import ServicesList from "../components/Catalog/Services/ServicesList";
import {CART_ROUTE, SERVICE_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";


const Home = observer(() => {
    const {services} = ServiceCatalogStore;
    const {products, popular} = ProductCatalogStore;
    const {apartments} = ApartmentCatalogStore;
    const navigate = useNavigate();


    useEffect(() => {
        ProductCatalogStore.fetchCatalog()
            .then(() => ServiceCatalogStore.fetchServiceCatalog())
            .then(() => CartStore.fetchCart())
            .then(() => ApartmentCatalogStore.fetchApartmentsCatalog())
            .then(()=>{
                showMainButton({
                    text: `В корзине ${CartStore.quality} товаров`,
                    is_visible: !!CartStore.quality,
                }, () => {navigate(CART_ROUTE)})
            })
    }, [])

    return (
        <div className="container">
            {services.length > 2 ?
                <ProductSlider
                    title={"Наши услуги"}
                    urlRule={SERVICE_ROUTE}
                    products={services}/>
                : null
            }

            <BannersSlider/>
            {apartments.length ?
                <BookingList
                    items={apartments}
                    type={'line'}
                    emptyText={"Товары не найдены"}
                />
                : null
            }

            {products.length ?
                <ProductList
                    products={products}

                    emptyText={"Товары не найдены"}
                /> : null
            }

        </div>
    );
});
export default Home;