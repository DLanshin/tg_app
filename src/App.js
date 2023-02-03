import React, {useEffect} from 'react';
import './App.css';
import Catalog from "./components/pages/Catalog";

import {BrowserRouter} from "react-router-dom";
import {useTelegram} from "./components/hooks/useTelegram";



const App = (props) => {
    const {tg,} = useTelegram();
    useEffect(()=>{
        tg.ready()
    })
  return (
      <BrowserRouter>
          <Catalog />
      </BrowserRouter>
  );
}

export default App;
