import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";

const RadioGroup = observer(({elements, required, name, type, value, setValue}) => {

    if (!elements.length) {
        return (
            <></>
        );
    }

    return (
        <div className={"radio-group"}>
            {
                elements.map((item, key) => (
                    <label key={item.id}>
                        <input
                            required={required}
                            type={type}
                            checked={value?.id === item.id}
                            name={name}
                            value={item}
                            onChange={()=>setValue(item)}
                        />
                        <span>{item.name}</span>
                    </label>
                ))
            }
        </div>
    );
});

export default RadioGroup;