import React, {useEffect, useState} from 'react';

import {observer} from "mobx-react-lite";
import Spinner from "../../Loaders/Spinner";
import CategoriesStore from "../../../store/categories/CategoriesStore";
import ProductCatalogStore from "../../../store/catalog/products/ProductCatalogStore";

const ProductCategoryList = observer((props) => {


    useEffect(()=>{
        if(props.category_alias)
            CategoriesStore.fetchCategories(props.category_alias);
    }, []);


    const toggleCategory = (id) =>{
        ProductCatalogStore.setFilter({
            category_id:ProductCatalogStore.filter.category_id === id ? null : id
        });
        ProductCatalogStore.fetchCatalog();
    }

    if(CategoriesStore.isLoading){
        return <Spinner/>
    }
    return (
        <div className={'category-list'}>
            <div className={'category-list__wrapper'}>
                <div onClick={()=>{toggleCategory(null)}} className={'category-list__item '+(!ProductCatalogStore.filter.category_id ? "active": "")}>
                    <span>Все</span>
                </div>
                {CategoriesStore.categories.length > 0 ?
                    CategoriesStore.categories.map(({id,name}) => (
                        <div key={id} onClick={()=>{toggleCategory(id)}} className={'category-list__item '+(id===ProductCatalogStore.filter.category_id ? "active": "")}>
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

export default ProductCategoryList;