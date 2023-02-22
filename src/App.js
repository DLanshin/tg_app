import React, {useEffect} from 'react';
import './assets/stylesheets/main.css';
import Profile from "./views/Profile";
import Catalog from "./views/Catalog";
import {Route, Routes} from "react-router-dom";
import Cart from "./views/Cart";

const App = () => {
    return (
        <div className={'app wrapper'}>
            <Routes>
                <Route path='/' element={<Catalog/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/cart' element={<Cart/>}/>
            </Routes>
        </div>
    );
}

export default App;
