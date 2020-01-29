import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// ********* Components
import Menu from './components/Menu/Menu';
import Slider from './components/Home/Slider';
import FindOrder from './components/Home/FindOrder';
import Dishes from './components/Dishes/Dishes';
import Drinks from './components/Drinks/Drinks';
import Order from './components/Orders/Order';
import Receipt from './components/Receipt/Receipt';

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Menu/>
            <Slider/>
            <FindOrder/>
          </Route>
          <Route path="/dishes">
            <Menu/>
            <Dishes/>
          </Route>
          <Route path="/drinks">
            <Menu/>
            <Drinks/>
          </Route>
          <Route path="/order">
            <Menu/>
            <Order/>
          </Route>
          <Route path="/receipt">
            <Menu/>
            <Receipt/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
