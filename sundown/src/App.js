import React, { useState, useEffect } from 'react';
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
  const [saveDish, setSaveDish] = useState('');
  const [saveDrinks, setSaveDrinks] = useState('');
  const [saveAmount, setSaveAmount] = useState('');
  const [saveEmail, setSaveEmail] = useState('');
  const [saveDate, setSaveDate] = useState('');

  useEffect(() => {
    // setSaveDish(saveDish)
    console.log(saveDish);
    console.log(saveDrinks);
    console.log(saveAmount);
    console.log(saveDate);
    console.log(saveEmail);
  },[saveDish, saveDrinks, saveAmount, saveDate, saveEmail])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Menu/>
            <Slider saveDish={saveDish} saveDrinks={saveDrinks} saveDate={saveDate} saveAmount={saveAmount} saveEmail={saveEmail}/>
            <FindOrder saveEmail={saveEmail} setSaveEmail={setSaveEmail} />
          </Route>
          <Route path="/dishes">
            <Menu/>
            <Dishes saveDish={saveDish} setSaveDish={setSaveDish} saveEmail={saveEmail} />
          </Route>
          <Route path="/drinks">
            <Menu/>
            <Drinks saveDrinks={saveDrinks} setSaveDrinks={setSaveDrinks} saveEmail={saveEmail} />
          </Route>
          <Route path="/order">
            <Menu/>
            <Order saveAmount={saveAmount} setSaveAmount={setSaveAmount} saveEmail={saveEmail} setSaveEmail={setSaveEmail} saveDate={saveDate} setSaveDate={setSaveDate} />
          </Route>
          <Route path="/receipt">
            <Menu/>
            <Receipt saveDish={saveDish} saveDrinks={saveDrinks} saveDate={saveDate} saveAmount={saveAmount} saveEmail={saveEmail} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
