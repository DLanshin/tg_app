import React, {useEffect} from 'react';
import './assets/stylesheets/main.css';
import Profile from "./views/Profile";
import {useTelegram} from "./hooks/useTelegram";
import Catalog from "./views/Catalog";



const App = (props) => {
    const {tg} = useTelegram();
    useEffect(()=>{
        tg.ready()
    })
  return (
      <div className={'app wrapper'}>
          <Catalog/>
      </div>
  );
}

export default App;
