import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import CategoryList from "../../components/Catalog/Category/CategoryList";
import ProductList from "../../components/Catalog/Product/ProductList";
import ApartmentStore from "../../store/booking/apartments/ApartmentStore";



const BookingPage = observer(() => {
    const [chooseCategory, setChooseCategory] = useState(null);
    const {items, categories,isLoading} = ApartmentStore;


    useEffect(()=>{
        ApartmentStore.fetchCategories()
    },[]);

    useEffect(()=>{
        ApartmentStore.setFilter({
            category_id:chooseCategory ? chooseCategory.id : null
        });
        ApartmentStore.fetchList()


    },[chooseCategory])

    return (
        <div>
            <CategoryList
                items={categories}
                value={chooseCategory}
                onChange={setChooseCategory}
            />
            <ProductList
                products={items}
                emptyText={"Апартаменты не найдены"}
                isLoading={isLoading}
            />
        </div>
    );
});
export default BookingPage;