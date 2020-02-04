import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
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
            <Slider saveDish={saveDish} setSaveDish={setSaveDish} saveDrinks={saveDrinks} setSaveDrinks={setSaveDrinks} saveDate={saveDate} setSaveDate={setSaveDate} saveAmount={saveAmount} setSaveAmount={setSaveAmount} saveEmail={saveEmail}/>
            <FindOrder saveEmail={saveEmail} setSaveEmail={setSaveEmail} />
          </Route>
          <Route path="/dishes">
            <Menu/>
            <Dishes saveDish={saveDish} setSaveDish={setSaveDish} saveEmail={saveEmail} />
          </Route>
          <Route path="/drinks">
            <Menu/>
            { saveDish.length === 0 
            ? 
            <Redirect to="/dishes"/> 
            : 
            <Drinks saveDrinks={saveDrinks} setSaveDrinks={setSaveDrinks} saveEmail={saveEmail} />}
          </Route>
          <Route path="/order">
            <Menu/>
            { saveDish.length === 0 && saveDrinks.length === 0 
            ? 
            // <Redirect to="/dishes"/>  
            <Order saveDish={saveDish} saveDrinks={saveDrinks} saveAmount={saveAmount} setSaveAmount={setSaveAmount} saveEmail={saveEmail} setSaveEmail={setSaveEmail} saveDate={saveDate} setSaveDate={setSaveDate} />
            : 
            <Order saveDish={saveDish} saveDrinks={saveDrinks} saveAmount={saveAmount} setSaveAmount={setSaveAmount} saveEmail={saveEmail} setSaveEmail={setSaveEmail} saveDate={saveDate} setSaveDate={setSaveDate} />}
          </Route>
          <Route path="/receipt">
            <Menu/>
            { saveDish.length === 0 && saveDrinks.length === 0 && saveAmount.length === 0 
            ? 
            <Redirect to="/dishes"/> 
            : 
            <Receipt saveDish={saveDish} setSaveDish={setSaveDish} saveDrinks={saveDrinks} setSaveDrinks={setSaveDrinks} saveDate={saveDate} setSaveDate={setSaveDate} saveAmount={saveAmount} setSaveAmount={setSaveAmount} saveEmail={saveEmail} />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
