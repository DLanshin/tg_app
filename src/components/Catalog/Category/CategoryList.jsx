import React from 'react';

const CategoryList = ({items, value, onChange}) => {
    console.log(items)
    return (
        <div className={'category-list'}>
            <div className={'category-list__wrapper'}>
                <div onClick={()=>{onChange(null)}} className={'category-list__item '+(!value ? "active": "")}>
                    <span>Все</span>
                </div>
                {items.length > 0 ?
                    items.map(({id, name}) => (
                        <div key={id} onClick={()=>{onChange(id)}} className={'category-list__item '+(id===value ? "active": "")}>
                            <span>{name}</span>
                        </div>
                    ))
                    :null
                }
            </div>
        </div>
    );
}

export default CategoryList;