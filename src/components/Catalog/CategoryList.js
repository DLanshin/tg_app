import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const CategoryList = (props) => {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };
    return (
        <Slider {...settings} className={'category-list'}>
            {props.category.map(item => (
                <div className={'category-list__item'}>
                    {item.name}
                </div>
            ))}
        </Slider>
    );
};

export default CategoryList;