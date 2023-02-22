import React, {useEffect} from 'react';
import './assets/stylesheets/main.css';
import Profile from "./views/Profile";
import Catalog from "./views/Catalog";
import {Route, Routes} from "react-router-dom";

const App = () => {
    return (
        <div className={'app wrapper'}>
            <Routes>
                <Route path='/' element={<Catalog/>}/>
                <Route path='/profile' element={<Profile/>}/>
            </Routes>
        </div>
    );
}

export default App;
