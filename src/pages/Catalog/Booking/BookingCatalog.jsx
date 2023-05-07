import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import Spinner from "../../../components/Loaders/Spinner";
import ApartmentCatalogStore from "../../../store/booking/apartments/ApartmentCatalogStore";
import BookingList from "../../../components/Catalog/Booking/BookingList";
import BookingFilter from "./BookingFilter";
import CategoryList from "../../../components/Catalog/Category/CategoryList";
import CategoriesStore from "../../../store/categories/CategoriesStore";




const BookingCatalog = observer(() => {
    const {apartments, isLoading, filter, main_category_alias} = ApartmentCatalogStore;
    const {categories} = CategoriesStore;

    useEffect(()=>{
        ApartmentCatalogStore.fetchApartmentsCatalog()
            .then(()=>CategoriesStore.fetchCategories(main_category_alias))

        return ()=>{
            CategoriesStore.unsetCategories()
        }
    },[])
    const toggleCategory = (id) =>{
        ApartmentCatalogStore.setFilter({
            category_id:filter.category_id === id ? null : id
        });
        ApartmentCatalogStore.fetchApartmentsCatalog();
    }
    const setFilter = (startDate, endDate, person) =>{
        ApartmentCatalogStore.setFilter({
            ...filter,
            quantity:person,
            date_start:startDate,
            date_end:endDate,
        })
        ApartmentCatalogStore.fetchApartmentsCatalog();
    }
    if(ApartmentCatalogStore.isLoading || CategoriesStore.isLoading){
        return <Spinner/>
    }
    console.log(apartments.length)
    return (
        <div>
            <CategoryList
                items={categories}
                onChange={toggleCategory}
                value={filter.category_id}
            />
            <BookingList
                type={"line"}
                items={apartments}
                emptyText={"Товары не найдены"}
            />
            <BookingFilter onSubmit={setFilter} {...filter}/>
        </div>
    );
});
export default BookingCatalog;