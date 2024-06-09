import Slider from "react-slick";
import React from "react";
import placeholderImage from "../../assets/images/placeholder.jpg"
import uuid from "react-uuid";

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const ImageSlider = ({images}) => {

    
    const settings = {
        dots: true,
        arrows:false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true
    };
    if(!images.length){
        images.push({id:uuid(), path:placeholderImage})
    }
    if(!images) return(<></>);
    return (
        <Slider {...settings} className={"gallery-slider"}>
            {images.map((item)=>(
                <div key={item.id} className={'gallery-slider__item'}>
                    <img src={item.path}/>
                </div>
            ))}
        </Slider>
    );
}
export default ImageSlider;
