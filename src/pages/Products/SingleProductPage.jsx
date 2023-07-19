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
import QuantityControl from "../../components/Button/QuantityControl";
import Button from "../../components/Button/Button";
import RadioGroup from "../../components/Form/RadioGroup";
import SkuGroup from "../../components/Catalog/Product/SkuGroup";


const SingleProductPage = observer((props) => {
    const {id} = useParams();
    const [selectedSku, setSelectedSku] = useState(null);
    const [count, setCount] = useState(1);
    const [itemCart, setItemCart] = useState(null);
    const {initBackButton} = useTelegram();

    const {item, isLoading} = ProductStore;

    useEffect(()=>{
        initBackButton(true, ()=>{history.back()})
        return ()=>{
            initBackButton(false);
        }
    },[])

    useEffect(()=>{
        CartStore.fetchCart()
            .then(()=>ProductStore.fetchItem(id)
                .then(()=>{
                    setSelectedSku(item.skus[0]);
                }));

        return () =>{
            ProductStore.unsetItem();
        }
    },[id]);


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
    if(isLoading){
        return <Spinner/>
    }
    return (
        <div className={'product-item'} key={item.id}>
            <Badges items={item.labels}/>
            <img src={item.image? item.image.path : placeholderImage} alt={item.title} className="product-item__image"/>
            <div className="product-item__content">
                <div className="product-item__content-body">
                    <div className="product-item__title">
                        {item.title}
                    </div>
                    <div className="product-item__row">
                        <SkuGroup
                            type={"radio"}
                            elements={item.skus}
                            value={selectedSku}
                            setValue={setSelectedSku}
                        />
                        <span className="product-item__price">
                            {selectedSku?.price === 0 ? 'Бесплатно': selectedSku?.price + ' ₽'}
                        </span>
                    </div>

                    {
                        item.description ?
                            <div className="product-item__panel">
                                <label>Описание</label>
                            </div>
                            :
                            null
                    }
                    <div className="product-item__description" dangerouslySetInnerHTML={{__html: item.description}}></div>
                </div>
                <div className="product-item__content-footer">
                    <div className="button-group">
                        <QuantityControl
                            decrementAction={()=>{setCount(count-1)}}
                            incrementAction={()=>{setCount(count+1)}}
                            count={count}/>
                        <Button className={"button-group__button"}>Добавить {selectedSku?.price * count + " ₽"}</Button>
                    </div>

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

