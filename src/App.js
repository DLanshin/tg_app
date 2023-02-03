import './App.css';
import {BrowserRouter, Route} from "react-router-dom";


const App = (props) => {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Route path='/' component={Catalog}/>
        <Route path='/cart' component={Cart}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/contacts' component={Contacts}/>
          <Route path='/order' component={Order}/>
      </BrowserRouter>

    </div>
  );
}

export default App;
