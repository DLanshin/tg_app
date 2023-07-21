import React, {useEffect, useState} from 'react';
import {ReactSVG} from "react-svg";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import placeholderImage from "../../assets/images/placeholder.jpg"
import CartStore from "../../store/cart/CartStore";
import ProductStore from "../../store/catalog/products/ProductStore";
import Spinner from "../../components/Loaders/Spinner";
import {useTelegram} from "../../hooks/useTelegram";
import Badges from "../../components/Common/badges";
import QuantityControl from "../../components/Button/QuantityControl";
import Button from "../../components/Button/Button";
import SkuGroup from "../../components/Catalog/Product/SkuGroup";
import MiniCart from "../../components/Cart/MiniCart";


const SingleProductPage = observer((props) => {
    const {id} = useParams();
    const [selectedSku, setSelectedSku] = useState(null);
    const [availableCount, setAvailableCount] = useState(999999);
    const [count, setCount] = useState(1);
    const {initBackButton, showTelegramAlert, showMainButton} = useTelegram();
    const {item, isLoading} = ProductStore;
    const {products} = CartStore;

    useEffect(() => {
        showMainButton({is_visible: false});
        initBackButton(true, () => {
            history.back()
        })
        return () => {
            initBackButton(false);
        }
    }, [])
    useEffect(() => {
        setAvailableCount(selectedSku?.use_stock ? selectedSku?.stock - CartStore.getProductCartCount(selectedSku.id) : 999999);

    }, [selectedSku, products])

    useEffect(() => {
        CartStore.fetchCart()
            .then(() => ProductStore.fetchItem(id)
                .then(() => {
                    setSelectedSku(ProductStore.item.skus[0]);
                }));

        return () => {
            ProductStore.unsetItem();
        }
    }, [id]);


    const addToCart = (selectedSku, count) => {
        CartStore.addProduct(selectedSku.id, count).then(() => {
            setCount(1)
            showTelegramAlert("Товар успешно добавлен в корзину")
        });
    }

    if (isLoading || !item?.id) {
        return <Spinner/>
    }

    return (
        <div className={'product-item'} key={item.id}>
            <Badges items={item.labels}/>
            <img src={item.image ? item.image.path : placeholderImage} alt={item.title}
                 className="product-item__image"/>
            <div className="product-item__content">
                <div className="product-item__content-body">
                    <div className="product-item__title">
                        {item.title}
                    </div>


                    <SkuGroup
                        label={"Выберите"}
                        type={"radio"}
                        elements={item.skus}
                        value={selectedSku}
                        setValue={setSelectedSku}
                    />
                    <MiniCart elements={products}/>
                    <div className="product-item__description"
                         dangerouslySetInnerHTML={{__html: item.description}}></div>
                </div>
                {availableCount ?
                    <div className="product-item__content-footer">
                        <div className="button-group">
                            <QuantityControl
                                decrementAction={() => {
                                    setCount(count <= 1 ? count : count - 1)
                                }}
                                incrementAction={() => {

                                    setCount(count >= availableCount ? count : count + 1)
                                }}
                                count={count}/>
                            <Button className={"button-group__button"}
                                    onClick={() => addToCart(selectedSku, count)}>Добавить {selectedSku?.price * count + " ₽"}</Button>
                        </div>
                    </div>
                    :
                    <></>
                }
            </div>
        </div>
    );
});
export default SingleProductPage;

