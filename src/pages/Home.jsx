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


const Home = observer(() => {
    const {services} = ServiceCatalogStore;
    const {products, popular} = ProductCatalogStore;
    const {apartments} = ApartmentCatalogStore;
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1
    };
    useEffect(() => {
        if (!ServiceCatalogStore.services.length) {
            ProductCatalogStore.fetchCatalog()
                .then(() => ServiceCatalogStore.fetchServiceCatalog())
                .then(() => CartStore.fetchCart())
                .then(() => ApartmentCatalogStore.fetchApartmentsCatalog())
        }

    }, [])

    return (
        <div className="container">
            {services.length > 2 ?
                <ProductSlider
                    title={"Наши услуги"}
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