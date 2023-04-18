import React, {useEffect} from 'react';
import ProductList from "../components/Catalog/Product/ProductList";
import CatalogStore from "../store/catalog/CatalogStore";
import {observer} from "mobx-react-lite";
import CartStore from "../store/cart/CartStore";
import ProductCard from "../components/Catalog/Product/ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannersSlider from "../components/Banners/BannersSlider";
import uuid from "react-uuid";
import ProductSlider from "../components/Catalog/Product/ProductSlider";




const Home = observer(() => {
    const {products, popular} = CatalogStore;
    const settings = {
        dots: true,
        arrows:false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1
    };
    useEffect(()=>{
        if(!CatalogStore.products.length){
            CatalogStore.fetchCatalog()
                .then(()=>CartStore.fetchCart())
        }

    },[])

    return (
        <div>
            <ProductSlider
                products={popular}/>
            <BannersSlider/>
            <ProductList
                products={products}
                type={'line'}
                emptyText={"Товары не найдены"}
            />

        </div>
    );
});
export default Home;