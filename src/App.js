import React, {useEffect} from 'react';
import './App.css';
import Catalog from "./components/pages/Catalog";

import {Route, Routes} from "react-router-dom";
import {useTelegram} from "./components/hooks/useTelegram";



const App = (props) => {
    const {tg,user} = useTelegram();
    useEffect(()=>{
        tg.ready()
    })
    console.log(user)
  return (
      <div className={'App'}>
          <Routes>
              <Route index element={Catalog}/>
              <Route path={'/profile'} element={Profile}/>
          </Routes>
      </div>
  );
}

export default App;
