import React from 'react';

const List = (props) => {

    return (
        <ul className={'list-info'}>
            {props.list.map(item => (
                <li>
                    <span>{item.name}</span>
                    <span>{item.value}</span>
                </li>
            ))}
        </ul>
    );
};

export default List;