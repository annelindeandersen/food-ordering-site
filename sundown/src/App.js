import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

// ********* Components
import Menu from './components/Menu/Menu';
import Slider from './components/Home/Slider';
import FindOrder from './components/Home/FindOrder';
import Dishes from './components/Dishes/Dishes';
import Drinks from './components/Drinks/Drinks';
import Order from './components/Orders/Order';
import Receipt from './components/Receipt/Receipt';
import Breadcrumbs from './components/Menu/Breadcrumbs';


function App() {
  const [saveDish, setSaveDish] = useState('');
  const [saveDrinks, setSaveDrinks] = useState('');
  const [selectedDrinkIds, setSelectedDrinkIds] = useState([]);
  const [saveAmount, setSaveAmount] = useState('');
  const [saveEmail, setSaveEmail] = useState('');
  const [saveDate, setSaveDate] = useState('');
  const [month, setMonth] = useState({
    name: '',
    value: ''
  });
  const [amount, setAmount] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [time, setTime] = useState('');
  const [email, setEmail] = useState('');
  const [newOrder, setNewOrder] = useState(false);
  const [exit, setExit] = useState('');
  const [enter, setEnter] = useState(false);

  useEffect(() => {
    console.log({ 'dish': saveDish});
    console.log({ 'drinks': saveDrinks});
    console.log({ 'selected-drink-ids': selectedDrinkIds});
    console.log({ 'amount': saveAmount});
    console.log({ 'date': saveDate});
    console.log({ 'email': saveEmail});
    console.log({ 'order': newOrder, month, day, year, time, email, amount});
  },[saveDish, saveDrinks, saveAmount, saveDate, saveEmail, selectedDrinkIds, month, day, time, year, email, amount, newOrder])

  return (
    <div className="App">
      <Router>

        <Menu />

        {/* <CSSTransition timeout={300} classNames={{appear: 'fade-appear', exit:'fade-exit'}}> */}
        <Breadcrumbs setExit={setExit} saveDish={saveDish} selectedDrinkIds={selectedDrinkIds} saveEmail={saveEmail} saveDrinks={saveDrinks} />
        {/* </CSSTransition> */}


        <Route render={({location}) => (

        <TransitionGroup>
          <CSSTransition key={location.key} timeout={300} classNames='fade'>
            <Switch location={location}>
              <Route exact path="/" >
                <div className="page">
                <Slider setSelectedDrinkIds={setSelectedDrinkIds} setSaveEmail={setSaveEmail} saveDish={saveDish} setSaveDish={setSaveDish} saveDrinks={saveDrinks} setSaveDrinks={setSaveDrinks} saveDate={saveDate} setSaveDate={setSaveDate} saveAmount={saveAmount} setSaveAmount={setSaveAmount} saveEmail={saveEmail}/>
                <FindOrder setSaveDrinks={setSaveDrinks} setSaveDate={setSaveDate} setSaveAmount={setSaveAmount} setSaveDish={setSaveDish} saveEmail={saveEmail} setSaveEmail={setSaveEmail} />
                </div>
              </Route>
              <Route path="/dishes" >
                <div className="page">
                <Dishes setExit={setExit} setEnter={setEnter} exit={exit} enter={enter} saveDish={saveDish} setSaveDish={setSaveDish} setSaveEmail={setSaveEmail} saveEmail={saveEmail} />
                </div>
              </Route>
              <Route path="/drinks">
                <div className="page">
                { saveDish === '' 
                ? 
                <Redirect to="/dishes"/> 
                : 
                <Drinks setExit={setExit} setEnter={setEnter} exit={exit} enter={enter} setSelectedDrinkIds={setSelectedDrinkIds} selectedDrinkIds={selectedDrinkIds} saveDrinks={saveDrinks} setSaveDrinks={setSaveDrinks} saveEmail={saveEmail} />}
                </div>
              </Route>
              <Route path="/order">
              <div className="page">
                { saveDish === '' && saveDrinks === '' 
                ? 
                <Redirect to="/dishes"/>  
                : 
                <Order newOrder={newOrder} setNewOrder={setNewOrder} month={month} setMonth={setMonth} day={day} setDay={setDay} time={time} setTime={setTime} year={year} setYear={setYear} amount={amount} setAmount={setAmount} email={email} setEmail={setEmail} saveDish={saveDish} saveDrinks={saveDrinks} saveAmount={saveAmount} setSaveAmount={setSaveAmount} saveEmail={saveEmail} setSaveEmail={setSaveEmail} saveDate={saveDate} setSaveDate={setSaveDate} />}
              </div>
              </Route>
              <Route path="/receipt">
              <div className="page">
                { saveDish === '' && saveDrinks === '' && saveAmount === '' 
                ? 
                <Redirect to="/dishes"/> 
                : 
                <Receipt saveDish={saveDish} setSaveDish={setSaveDish} saveDrinks={saveDrinks} setSaveDrinks={setSaveDrinks} saveDate={saveDate} setSaveDate={setSaveDate} saveAmount={saveAmount} setSaveAmount={setSaveAmount} saveEmail={saveEmail} />
                }
              </div>
              </Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>

      )} />
      </Router>
    </div>
  );
}

export default App;
