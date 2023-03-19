import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import {getProduct} from "../services/productsApi";
import Spinner from "../components/Loaders/Spinner";
import minusIcon from "../assets/images/icons/minus_icon.svg";
import plusIcon from "../assets/images/icons/plus_icon.svg";
import closeIcon from "../assets/images/icons/close_icon.svg";

import {ReactSVG} from "react-svg";



const Product = (props) => {
    const dispatch = useDispatch(),
        {id} = useParams(),
        product = useSelector(state => state.product),
        [selectedSku, setSelectedSku] = useState(product.selectedSku);

    useEffect(() => {
        setSelectedSku(product.selectedSku);
    }, [product.selectedSku]);

    useEffect(()=>{
        dispatch(getProduct(id))
    }, []);

    if(product.isLoading){
        return <Spinner/>
    }
    const closeProduct = () =>{
        history.back()
    }

    return (
        <div className={'product-item'} key={product.id}>
            <button className={'product-item__close'} onClick={closeProduct}>
                <ReactSVG src={closeIcon}/>
            </button>
            <img src={product.image.path} alt={product.title} className="product-item__image"/>
            <div className="product-item__content">
                <div className="product-item__content-body">
                    <div className="product-item__title">
                        {product.title}
                    </div>
                    <div className="product-item__variables">
                        {
                            product.skus.length > 1 ?
                                    product.skus.map(sku => (
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

                    <div className="product-item__description" dangerouslySetInnerHTML={{__html: product.description}}></div>
                </div>
                <div className="product-item__content-footer">
                    <div className="button-group">
                        <div className="quality-button">
                            <button className={'quality-button__btn'}>
                                <ReactSVG src={minusIcon}/>
                            </button>
                            <div className={'quality-button__result'}>1</div>
                            <button className={'quality-button__btn'}>
                                <ReactSVG src={plusIcon}/>
                            </button>
                        </div>
                        <button className="button-group__button">Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Product;