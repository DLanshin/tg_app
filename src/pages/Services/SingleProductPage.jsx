import React, {useEffect, useState} from 'react';
import {ReactSVG} from "react-svg";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {icons} from "../../components/icons";
import placeholderImage from "../../assets/images/placeholder.jpg"
import CartStore from "../../store/cart/CartStore";
import ProductStore from "../../store/catalog/products/ProductStore";
import Spinner from "../../components/Loaders/Spinner";
import {useTelegram} from "../../hooks/useTelegram";
import Badges from "../../components/Common/badges";


const SingleProductPage = observer((props) => {
    const {id} = useParams();
    const [selectedSku, setSelectedSku] = useState(null);
    const [itemCart, setItemCart] = useState(null);
    const {initBackButton} = useTelegram();
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
        });

    }
    const increment = (cartProduct) => {
        CartStore.updateProduct(cartProduct.sku_id, cartProduct.count+1);
    }
    const decrement = (cartProduct) => {
        if(cartProduct.count === 1){
            CartStore.deleteProduct(cartProduct.sku_id);
            setItemCart(null)
        }else{
            CartStore.updateProduct(cartProduct.sku_id, cartProduct.count-1);
        }
    }
    if(ProductStore.isLoading){
        return <Spinner/>
    }
    return (
        <div className={'product-item'} key={ProductStore.item.id}>
            <Badges items={ProductStore.item.labels}/>
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
                                    <div className="quality-button">
                                        <button className={'quality-button__btn'} onClick={()=>decrement(itemCart)}>
                                            -
                                            <ReactSVG src={icons.minus}/>
                                        </button>
                                        <div className={'quality-button__result'}>{itemCart?.count}</div>
                                        <button className={'quality-button__btn'} onClick={()=>increment(itemCart)}>
                                            +
                                            <ReactSVG src={icons.plus}/>
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
export default SingleProductPage;

