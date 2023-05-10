import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import placeholderImage from "../../../assets/images/placeholder.jpg"
import {useTelegram} from "../../../hooks/useTelegram";
import CartStore from "../../../store/cart/CartStore";
import ProductStore from "../../../store/catalog/products/ProductStore";
import Spinner from "../../../components/Loaders/Spinner";
import {MAKE_ORDER_ROUTE} from "../../../utils/consts";


const Service = observer((props) => {
    const {id} = useParams();
    const [selectedSku, setSelectedSku] = useState(null);
    const [itemCart, setItemCart] = useState(null);
    const {initBackButton} = useTelegram();
    const navigate = useNavigate();

    useEffect(()=>{
        initBackButton(true, ()=>{history.back()})
        return ()=>{
            initBackButton(false);
        }
    },[])
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
            goToMakeOrderPage()
        });

    }
    const goToMakeOrderPage = () =>{
        navigate(MAKE_ORDER_ROUTE);
    }

    if(ProductStore.isLoading){
        return <Spinner/>
    }
    return (
        <div className={'product-item'} key={ProductStore.item.id}>
            <img src={ProductStore.item.image? ProductStore.item.image.path : placeholderImage} alt={ProductStore.item.title} className="product-item__image"/>
            <div className="product-item__content">
                <div className="product-item__content-body">
                    <div className="product-item__title">
                        {ProductStore.item.title}
                    </div>
                    <div className="product-item__row">
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
                        <span className="product-item__price">
                            {selectedSku?.price === 0 ? 'Бесплатно': selectedSku?.price + ' ₽'}
                        </span>
                    </div>

                    {
                        ProductStore.item.description ?
                            <div className="product-item__panel">
                                <label>Описание</label>
                            </div>
                            :
                            null
                    }
                    <div className="product-item__description" dangerouslySetInnerHTML={{__html: ProductStore.item.description}}></div>
                </div>
                <div className="product-item__content-footer">
                    <div className="button-group">
                        {
                            itemCart ?
                                <div className="button-group">
                                    <button className="button-group__button button-group__button--success" onClick={()=>goToMakeOrderPage()}>
                                        Оформить заказ · {itemCart.count*itemCart.price + " ₽"}</button>
                                </div>
                                :
                                <div className="button-group">
                                    <button
                                        className="button-group__button"
                                        onClick={()=>add(selectedSku)}
                                    >Оформить заказ</button>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
});
export default Service;

