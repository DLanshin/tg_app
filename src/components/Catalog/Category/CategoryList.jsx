import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCategories, getProductsByCategory} from "../../../services/productsApi";

const CategoryList = (props) => {
    const dispatch = useDispatch(),
        categories = useSelector(state => state.categories.categories);

    useEffect(()=>{
        dispatch(getCategories())
    }, []);

    const chooseCategory= (category) => {
        dispatch(getProductsByCategory(category))
    }


    return (
        <div className={'category-list'}>
            {categories.length > 0 ?
                categories.map(({id,name}) => (
                    <div key={id} onClick={()=>{chooseCategory(id)}} className={'category-list__item'}>
                        <span>{name}</span>
                    </div>
                ))
                :
                <div>

                </div>
            }
        </div>
    );
};

export default CategoryList;