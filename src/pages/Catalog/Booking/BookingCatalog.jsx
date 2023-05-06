import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import Spinner from "../../../components/Loaders/Spinner";
import ProductCategoryList from "../../../components/Catalog/Category/ProductCategoryList";
import ApartmentCatalogStore from "../../../store/booking/apartments/ApartmentCatalogStore";
import BookingList from "../../../components/Catalog/Booking/BookingList";
import BookingFilter from "./BookingFilter";




const BookingCatalog = observer(() => {
    const {apartments, isLoading, filter} = ApartmentCatalogStore;
    const params = useParams();

    useEffect(()=>{
        if(!apartments.length){
            ApartmentCatalogStore.fetchApartmentsCatalog()
        }
    },[])
    if(isLoading){
        return <Spinner/>
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
    return (
        <div>
            <ProductCategoryList category_alias={"booking"}/>
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