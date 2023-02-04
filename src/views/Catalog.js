import React from 'react';
import Header from "../layouts/Header/Header";
import {useTelegram} from "../hooks/useTelegram";



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
        image:"",
        price:600,
    }
];
const Catalog = (props) => {
    const {tg, showMainButton} = useTelegram();
    showMainButton({text:"Корзина"});
    let showText = "";
    tg.WebApp.onEvent('mainButtonClicked', function (){
        showText = "ssssssssssss";
    });
    return (
        <div>

            {showText}
        </div>
    );
}
export default Catalog;