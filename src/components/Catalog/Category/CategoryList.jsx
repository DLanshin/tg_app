import React, {useEffect, useState} from 'react';

import {observer} from "mobx-react-lite";
import CategoriesStore from "../../../store/catalog/CategoriesStore";
import CatalogStore from "../../../store/catalog/CatalogStore";
import Spinner from "../../Loaders/Spinner";

const CategoryList = observer((props) => {
    useEffect(()=>{
        CategoriesStore.fetchCategories();
    }, []);


    const toggleCategory = (id) =>{
        CatalogStore.setFilter({
            category_id:CatalogStore.filter.category_id === id ? null : id
        });
        CatalogStore.fetchCatalog();
    }

    if(CatalogStore.isLoading || CategoriesStore.isLoading){
        return <Spinner/>
    }
    return (
        <div className={'category-list'}>
            <div className={'category-list__wrapper'}>
                <div onClick={()=>{toggleCategory(null)}} className={'category-list__item '+(!CatalogStore.filter.category_id ? "active": "")}>
                    <span>Все</span>
                </div>
                {CategoriesStore.categories.length > 0 ?
                    CategoriesStore.categories.map(({id,name}) => (
                        <div key={id} onClick={()=>{toggleCategory(id)}} className={'category-list__item '+(id===CatalogStore.filter.category_id ? "active": "")}>
                            <span>{name}</span>
                        </div>
                    ))
                    :
                    <div>

                    </div>
                }
            </div>
        </div>
    );
});

export default CategoryList;