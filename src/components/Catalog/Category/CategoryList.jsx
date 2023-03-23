import React, {useEffect, useState} from 'react';

import {observer} from "mobx-react-lite";
import CategoriesStore from "../../../store/catalog/CategoriesStore";
import CatalogStore from "../../../store/catalog/CatalogStore";

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


    return (
        <div className={'category-list'}>
            <div className={'category-list__wrapper'}>
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