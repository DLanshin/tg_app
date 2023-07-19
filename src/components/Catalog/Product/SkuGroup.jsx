import React from 'react';
import {observer} from "mobx-react-lite";

const SkuGroup = observer((props) => {
    const {
        elements,
        type,
        value,
        setValue
    } = props
    if (!elements.length) {
        return (
            <></>
        );
    }
    console.log(value)
    return (
        <div className={"radio-group"}>
            {
                elements.map((item, key) => (
                    <label key={item.id}>
                        <input
                            type={type}
                            checked={value === item}
                            value={item}
                            onChange={()=>setValue(item)}
                        />
                        <span>{item.title}</span>
                    </label>
                ))
            }
        </div>
    );
});

export default SkuGroup;