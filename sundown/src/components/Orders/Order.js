import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {setHours, setMinutes, getDay, parseISO} from "date-fns";
import {Link} from "react-router-dom";
import { setDate } from 'date-fns/esm/fp';
import EmailValidator from 'email-validator';

function Order({saveAmount, setSaveAmount, saveEmail, setSaveEmail, saveDate, setSaveDate, saveDish, saveDrinks}) {
    // const [storedEmail, setStoredEmail] = useState('');
    let [amount, setAmount] = useState('');
    const [email, setEmail] = useState('');
    const [orderButton, setOrderButton] = useState('Order');
    const [startDate, setStartDate] = useState('');
    const isWeekday = date => {
        const day = getDay(date);
        return day !== 0 && day !== 6;
      };

    const addPeople = () => {
        amount += 1;
        if (amount > 10) {
            amount -= 1;
            setAmount(amount);
            console.log(amount);
        } else {
            setAmount(amount);
            console.log(amount);
        }
    }

    const minusPeople = () => {
        amount -= 1;
        if (amount < 0 || amount === 0) {
            amount += 1;
            setAmount(amount);
            console.log(amount);
        } else {
            setAmount(amount);
            console.log(amount);
        }
    }

    useEffect(() => {
        // console.log(saveDish, saveDrinks)
        const savedData = localStorage.getItem(saveEmail);
        // setStoredEmail(savedData);
        const dataParse = JSON.parse(savedData);
        console.log(dataParse, saveEmail);

        if(saveEmail) {
            setAmount(dataParse[0].amount);
            setStartDate(parseISO(dataParse[0].date));
            setEmail(saveEmail);
            setOrderButton('Update order');
        } else {
            setAmount(1)
            setStartDate(setHours(setMinutes(new Date(), 0), 16))
        }
        
    }, [])

    const saveOrder = () => {
        const validatedEmail = EmailValidator.validate(email);
        console.log(validatedEmail);
        if (validatedEmail === true && saveDish.length !== 0 && saveDrinks.length !== 0) {
            setSaveAmount(amount);
            setSaveDate(startDate);
            setSaveEmail(email);
        } else if (validatedEmail === false) {
            console.log(saveDish.length);
            document.getElementById('error').innerHTML = 'Sorry, email not valid!';
        } else {
            document.getElementById('error').innerHTML = 'You have to pick drinks & food!';
        }
        
    }

    return (
        <div id="orderContainer">
            <h2>Order details</h2>
            <div id="orderWrapper">
                <div id="date">
                    <h4 className="blueFont">Pick date and time</h4><br/>
                    <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    showTimeSelect
                    minTime={setHours(setMinutes(new Date(), 0), 16)}
                    maxTime={setHours(setMinutes(new Date(), 0), 23)}
                    filterDate={isWeekday}
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    timeCaption="time"
                    minDate={new Date()}
                    inline
                    dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </div>
                <div id="emailWrapper">
                    <h4 className="blueFont">Select amount of people</h4><br/>
                    <div id="amount">
                        <img onClick={minusPeople} className="amountImg" src="./img/less.png" alt="less"/>
                        <h1>{amount}</h1>
                        <img onClick={addPeople} className="amountImg" src="./img/more.png" alt="more"/>
                    </div><br/>
                    <label>Enter email</label>
                    <p id="error"></p>
                    <input placeholder="Enter email" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    <Link to={EmailValidator.validate(email) == true && saveDish.length !== 0 && saveDrinks.length !== 0 ? '/receipt' : '/order'}>
                        <button onClick={saveOrder} className="button">{orderButton}</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Order;