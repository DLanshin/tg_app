import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCategories} from "../../api/products";
import CategoryList from "../Catalog/Category/CategoryList";
import UserAvatar from "../Profile/UserAvatar";
import {NavLink} from "react-router-dom";
import backIcon from "../../assets/images/icons/back_arrow.svg";
import {ReactSVG} from "react-svg";

const NavPanel = (props) => {
    const categories = useSelector(state => state.categoriesList.categories),
        dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCategories())
    },[])
    return (
        <div className={'nav-panel'}>
            {
                props?.type && typeof props?.type !== "undefined" &&  props?.type === "catalog" ?
                    <CategoryList category={categories}/>
                    :
                    <NavLink to={"/"} className="back-button">
                        <ReactSVG src={backIcon} />
                    </NavLink>
            }

            <UserAvatar className={'small conic-gradient'}/>
        </div>
    );
};

export default NavPanel;