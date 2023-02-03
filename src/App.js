import React from 'react';
import './App.css';
import Catalog from "./components/pages/Catalog";

import {BrowserRouter} from "react-router-dom";



const App = (props) => {
  return (
      <BrowserRouter>
          <Catalog />
      </BrowserRouter>
  );
}

export default App;
