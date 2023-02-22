import React, {useEffect} from 'react';
import CategoryList from "./CategoryList";
import UserAvatar from "../../Profile/UserAvatar";
import {useDispatch, useSelector} from "react-redux";
import {getCategories} from "../../../api/products";

const CatalogNavPanel = (props) => {
    const categories = useSelector(state => state.categoriesList.categories),
        dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCategories())
    },[])
    return (
        <div className={'nav-panel'}>
            <CategoryList category={categories}/>
            <UserAvatar className={'small conic-gradient'}/>
        </div>
    );
};

export default CatalogNavPanel;