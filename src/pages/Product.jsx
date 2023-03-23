import React, {useEffect, useState} from 'react';
import Spinner from "../components/Loaders/Spinner";
import minusIcon from "../assets/images/icons/minus_icon.svg";
import plusIcon from "../assets/images/icons/plus_icon.svg";
import closeIcon from "../assets/images/icons/close_icon.svg";
import {ReactSVG} from "react-svg";

import CartStore from "../store/cart/CartStore";
import ProductStore from "../store/catalog/ProductStore";
import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";


const Product = observer((props) => {
    const {id} = useParams();
    const [selectedSku, setSelectedSku] = useState(null);
    const [itemCart, setItemCart] = useState(null);

    useEffect(()=>{
        CartStore.fetchCart()
            .then(()=>ProductStore.fetchProduct(id)
                .then(()=>{
                    if(ProductStore.item.skus){
                        setSelectedSku(ProductStore.item.skus[0]);
                    }
                }));

        return () =>{
            ProductStore.unsetProduct();
        }
    },[id]);

    useEffect(()=>{
        if(selectedSku){
            setItemCart(CartStore.getItemCartProduct(selectedSku.id))
        }
    },[selectedSku]);

    const add = (selectedSku) => {
        CartStore.addProduct(selectedSku.id).then(() => {
            setItemCart(CartStore.getItemCartProduct(selectedSku.id));
        });

    }
    const increment = (cartProduct) => {
        console.log("increment")
        CartStore.updateProduct(cartProduct.sku_id, cartProduct.count+1);
    }
    const decrement = (cartProduct) => {
        console.log("decrement")
        if(cartProduct.count === 1){
            CartStore.deleteProduct(cartProduct.sku_id);
            setItemCart(null)
        }else{
            CartStore.updateProduct(cartProduct.sku_id, cartProduct.count-1);
        }
    }

    const closeProduct = () =>{
        history.back()
    }

    if(ProductStore.isLoading){
        return <Spinner/>
    }
    return (
        <div className={'product-item'} key={ProductStore.item.id}>

            <button className={'product-item__close'} onClick={closeProduct}>
                <ReactSVG src={closeIcon}/>
            </button>
            <img src={ProductStore.item.image?.path} alt={ProductStore.item.title} className="product-item__image"/>
            <div className="product-item__content">
                <div className="product-item__content-body">
                    <div className="product-item__title">
                        {ProductStore.item.title}
                    </div>
                    <div className="product-item__variables">
                        {
                            ProductStore.item.skus?.length > 1 ?
                                ProductStore.item.skus?.map(sku => (
                                        <div key={sku.id}
                                             className={'product-item__variables-item '+(sku.id === selectedSku?.id ? "selected" : "")}
                                            onClick={()=>{setSelectedSku(sku)}}
                                        >
                                            {sku.title}
                                        </div>
                                    ))
                                :
                                ""
                        }
                    </div>
                    <div className="product-item__panel">
                        <label>Описание</label>
                        <span className="product-item__price">
                            {selectedSku?.price + ' ₽'}
                        </span>
                    </div>

                    <div className="product-item__description" dangerouslySetInnerHTML={{__html: ProductStore.item.description}}></div>
                </div>
                <div className="product-item__content-footer">
                    <div className="button-group">
                        {
                            itemCart ?
                                <div className="button-group">
                                    <div className="quality-button">
                                        <button className={'quality-button__btn'} onClick={()=>decrement(itemCart)}>
                                            <ReactSVG src={minusIcon}/>
                                        </button>
                                        <div className={'quality-button__result'}>{itemCart?.count}</div>
                                        <button className={'quality-button__btn'} onClick={()=>increment(itemCart)}>
                                            <ReactSVG src={plusIcon}/>
                                        </button>
                                    </div>
                                    <button className="button-group__button button-group__button--success">
                                        В корзине · {itemCart?.count} | {itemCart.count*itemCart.price + " ₽"}</button>
                                </div>
                                :
                                <div className="button-group">
                                    <button
                                        className="button-group__button"
                                        onClick={()=>add(selectedSku)}
                                    >Добавить</button>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
});
export default Product;
