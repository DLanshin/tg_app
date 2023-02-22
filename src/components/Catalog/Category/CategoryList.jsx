import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import uuid from "react-uuid";
import {useSlider} from "../../../hooks/useSlider";
import {useDispatch} from "react-redux";
import {getProductsByCategory} from "../../../api/products";

const CategoryList = (props) => {
    const {categorySettings} = useSlider(),
        dispatch = useDispatch();

    const chooseCategory= (category) => {
        dispatch(getProductsByCategory(category))
    }

    return (
        <Slider {...categorySettings} className={'category-list'}>
            {props.category.length > 0 ?
                props.category.map(item => (
                    <div key={uuid()} onClick={()=>{chooseCategory(item)}} className={'category-list__item'}>
                        {item}
                    </div>
                ))
                :
                <div>

                </div>
            }
        </Slider>
    );
};

export default CategoryList;