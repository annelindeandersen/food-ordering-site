import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {setHours, setMinutes, getDay, parseISO} from "date-fns";
import {Link} from "react-router-dom";
import { setDate } from 'date-fns/esm/fp';
import EmailValidator from 'email-validator';
import moment from 'moment';

function Order({saveAmount, setSaveAmount, saveEmail, setSaveEmail, saveDate, setSaveDate, saveDish, saveDrinks}) {
    // const [storedEmail, setStoredEmail] = useState('');
    const [month, setMonth] = useState((new Date()).getMonth() + 1);
    const [day, setDay] = useState((new Date()).getDate());
    const [year, setYear] = useState((new Date()).getFullYear());
    const [time, setTime] = useState(16);

    const [dateSelected, setDateSelected] = useState(new Date(year, month, day, time))

    let [amount, setAmount] = useState(1);
    const [email, setEmail] = useState('');
    const [orderButton, setOrderButton] = useState('Order');
    const [startDate, setStartDate] = useState('');
    const isWeekday = date => {
        const day = getDay(date);
        return day !== 0 && day !== 6;
      };

    const monthsInYear = moment.months()
    const daysInMonth = moment(`${year}-${month}`).daysInMonth();
    
    let dayRows = []
    for (let i = 1; i < daysInMonth +1; i++) {
        const date = moment(`${year}-${month}-${i}`).weekday()
        const dateText = moment.weekdays(date)
        console.log(date)
        dayRows.push(<option value={i} disabled={date === 6 || date === 0}>{i} - {(dateText)}</option>)
    }

    console.log(new Date(year, month, day, time))
    console.log(monthsInYear)
    console.log(amount)

    const addPeople = () => {
        amount += 1;
        if (isNaN(amount) === true) {
            setAmount(1);
        } else if (amount > 10) {
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
            document.getElementById('emailInput').disabled = 'true';
        } else {
            setAmount(1)
            setStartDate(setHours(setMinutes(new Date(), 0), 16))
        }
        
    }, [])

    useEffect(() => {
        if (amount === 1) {
            document.querySelector('.addPeople').style.visibility = 'visible';
            document.querySelector('.lessPeople').style.visibility = 'hidden';
            document.getElementById('errorAmount').innerHTML = '';
        } else if (amount < 1) {
            document.querySelector('.addPeople').style.visibility = 'visible';
            document.querySelector('.lessPeople').style.visibility = 'hidden';
            document.getElementById('errorAmount').innerHTML = 'Sorry, amount has to be between 1 and 10';
        } else if (amount > 10) {
            document.querySelector('.addPeople').style.visibility = 'hidden';
            document.querySelector('.lessPeople').style.visibility = 'visible';
            document.getElementById('errorAmount').innerHTML = 'Sorry, amount has to be between 1 and 10';
        } else if (amount === 10) {
            document.querySelector('.addPeople').style.visibility = 'hidden';
            document.querySelector('.lessPeople').style.visibility = 'visible';
            document.getElementById('errorAmount').innerHTML = '';
        } else if (isNaN(amount) === true) {
            document.querySelector('.addPeople').style.visibility = 'visible';
            document.querySelector('.lessPeople').style.visibility = 'hidden';
            document.getElementById('errorAmount').innerHTML = 'Add a number or use arrows';
        } else {
            document.querySelector('.addPeople').style.visibility = 'visible';
            document.querySelector('.lessPeople').style.visibility = 'visible';
            document.getElementById('errorAmount').innerHTML = '';
        }
    }, [amount])

    const saveOrder = () => {
        if (amount > 10 || amount < 1) {
            document.getElementById('errorAmount').innerHTML = 'Sorry, amount has to be between 1 and 10';
            return;
        }
        const validatedEmail = EmailValidator.validate(email);
        console.log(validatedEmail);
        if (validatedEmail === true && saveDish.length !== 0 && saveDrinks.length !== 0) {
            setSaveAmount(amount);
            // setSaveDate(startDate);
            setDateSelected(new Date(year, month, day, time));
            setSaveEmail(email);
        } else if (email.length === 0) {
            document.getElementById('error').innerHTML = 'Sorry, email cannot be empty!';
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
                    <div id="dateSelect">
                        <select value={month} id="month" onChange={(event) => setMonth(event.target.value)}>
                            {monthsInYear.map((month) => (
                                <option value={moment(month).format('MM')}>{month}</option>
                            ))}
                        </select>
                        <select value={day} id="day" onChange={(event) => setDay(event.target.value)}>
                            {dayRows}
                        </select>
                        <select value={year} id="year" onChange={(event) => setYear(event.target.value)}>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                        </select>
                        <select value={time} id="time" onChange={(event) => setTime(event.target.value)}>
                            <option value="16">16:00</option>
                            <option value="17">17:00</option>
                            <option value="18">18:00</option>
                            <option value="19">19:00</option>
                            <option value="20">20:00</option>
                            <option value="21">21:00</option>
                            <option value="22">22:00</option>
                            <option value="23">23:00</option>
                        </select>
                    </div><br/>
                    <h4 className="blueFont">Selected date:</h4> 
                    <p>{moment(new Date(year, month - 1, day, time)).format('LLLL')}</p>
                    {/* <DatePicker
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
                    /> */}
                </div>
                <div id="emailWrapper">
                    <h4 className="blueFont">Select amount of people</h4><br/>
                    <div id="amount">
                        <img onClick={minusPeople} className="amountImg lessPeople" src="./img/less.png" alt="less"/>
                        {/* <h1>{amount}</h1> */}
                        <input type="number" min="1" max="10" maxLength="2" value={amount} onChange={(event) => setAmount(parseInt(event.target.value))} />
                        <img onClick={addPeople} className="amountImg addPeople" src="./img/more.png" alt="more"/>
                    </div>
                    <div className="errorBoxMargin"><p id="errorAmount"></p></div>
                    <br/>
                    <label>Enter email</label>
                    <input placeholder="Enter email" id="emailInput" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    <Link to={EmailValidator.validate(email) == true && saveDish.length !== 0 && saveDrinks.length !== 0 && amount <= 10 && amount >= 1 ? '/receipt' : '/order'}>
                        <button onClick={saveOrder} className="button">{orderButton}</button>
                    </Link>
                    <div className="errorBoxMargin"><p id="error"></p></div>
                </div>
            </div>
        </div>
    )
}

export default Order;