import React from 'react';
import Header from "../layouts/Header/Header";
import {useTelegram} from "../hooks/useTelegram";
import productImage from "../assets/images/product.jpg"
import ProductList from "../components/Catalog/ProductList/ProductList";


const categoriesList = [
    {
        id:1,
        name:"Латте"
    },
    {
        id:2,
        name:"Американо"
    },
    {
        id:3,
        name:"Рафф"
    }
];
const productList = [
    {
        id:1,
        name:"Название",
        description:"Описание товарва",
        image:productImage,
        price:600,
    },
    {
        id:1,
        name:"Название",
        description:"Описание товарва",
        image:productImage,
        price:600,
    },
    {
        id:1,
        name:"Название",
        description:"Описание товарва",
        image:productImage,
        price:600,
    },
    {
        id:1,
        name:"Название",
        description:"Описание товарва",
        image:productImage,
        price:600,
    },
    {
        id:1,
        name:"Название",
        description:"Описание товарва",
        image:productImage,
        price:600,
    },
    {
        id:1,
        name:"Название",
        description:"Описание товарва",
        image:productImage,
        price:600,
    },
];
const Catalog = (props) => {
    const {tg, showMainButton} = useTelegram();
    showMainButton({text:"Корзина"});
    let showText = "";
    return (
        <div>
            <ProductList products={productList}/>
        </div>
    );
}
export default Catalog;