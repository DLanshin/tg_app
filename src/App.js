import React, {useEffect} from 'react';
import './App.css';
import Catalog from "./components/pages/Catalog";

import {Route, Routes} from "react-router-dom";
import {useTelegram} from "./components/hooks/useTelegram";
import Profile from "./components/pages/Profile";



const App = (props) => {
    const {tg,user} = useTelegram();
    useEffect(()=>{
        tg.ready()
    })
    console.log(user);
  return (
      <div className={'App'}>
          <Catalog/>
      </div>
  );
}

export default App;
