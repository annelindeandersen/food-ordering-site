import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { setDate } from 'date-fns/esm/fp';
import EmailValidator from 'email-validator';
import moment from 'moment';
import classNames from 'classnames';

function Order({newOrder, setNewOrder, month, setMonth, day, setDay, year, setYear, amount, setAmount, time, setTime, email, setEmail, saveAmount, setSaveAmount, saveEmail, setSaveEmail, saveDate, setSaveDate, saveDish, saveDrinks}) {
    const currentMonth = (new Date()).getMonth() + 1
    const currentYear = moment().year();
    const [dateSelected, setDateSelected] = useState('')
    const [orderButton, setOrderButton] = useState('Order');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorAmount, setErrorAmount] = useState('');

    const monthsInYear = moment.months()
    const daysInMonth = moment(`${year}-${month.value}`).daysInMonth();
    
    let dayRows = []
    for (let i = 1; i < daysInMonth +1; i++) {
        const date = moment(`${year}-${month.value}-${i}`).weekday()
        const dateText = moment.weekdays(date)
        dayRows.push(<option value={i} disabled={date === 6 || date === 0}>{i} - {(dateText)}</option>)
    }

    let yearRows = []
    let startYear = currentYear
    const endYear = currentYear + 4
    for (startYear; startYear <= endYear; startYear++) {
        yearRows.push(<option value={startYear}>{startYear}</option>)
    }

    const addPeople = () => {
        amount += 1;
        setNewOrder(true);
        if (amount >= 1 && amount <= 10) {
            setErrorAmount('')
        }
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
        setNewOrder(true);
        if (amount >= 1 && amount <= 10) {
            setErrorAmount('')
        }
        if (amount < 0 || amount === 0) {
            amount += 1;
            setAmount(amount);
            console.log(amount);
        } else {
            // setErrorAmount('')
            setAmount(amount);
            console.log(amount);
        }
    }

    useEffect(() => {
        const savedData = localStorage.getItem(saveEmail);
        const dataParse = JSON.parse(savedData);
        // console.log(dataParse, saveEmail);
  
        if (saveEmail) {
            let setLocalData = {
                newAmount: dataParse[0].amount,
                newDate: dataParse[0].date,
            }
            let setDateValues = {
                newMonth: {
                    name: moment(setLocalData.newDate).format('MMMM'),
                    value: moment(setLocalData.newDate).month() + 1
                },
                newYear: moment(setLocalData.newDate).year(),
                newDay: moment(setLocalData.newDate).date(),
                newTime: moment(setLocalData.newDate).format('HH')
            }
            setAmount(setLocalData.newAmount);
            setDateSelected(setLocalData.newDate);
            setMonth(setDateValues.newMonth);
            setYear(setDateValues.newYear);
            setDay(setDateValues.newDay);
            setTime(setDateValues.newTime);
            // console.log(setLocalData);
            // console.log(setDateValues);
            setEmail(saveEmail);
            setOrderButton('Update order');
            document.getElementById('emailInput').disabled = 'true';
        } else if (newOrder === true) {
            console.log('No logged user, but pre saved data')
            console.log(newOrder)
            let setPreSaved = {
                amountPre: amount,
                monthPre: {
                    name: month.name,
                    value: Number(month.value)
                },
                dayPre: Number(day),
                timePre: Number(time),
                yearPre: Number(year)
            }
            let setPreDateSelected = moment(new Date(setPreSaved.yearPre, setPreSaved.monthPre.value - 1, setPreSaved.dayPre, setPreSaved.timePre)).format('LLLL')
            setAmount(amount);
            setEmail(email);
            setMonth(month);
            setDay(day);
            setTime(time);
            setYear(year);
            setDateSelected(setPreDateSelected);
        } else {
            console.log('No logged user')
            let setDefault = {
                amountDef: 2,
                monthDef: {
                    name: moment.months((new Date()).getMonth()),
                    value: (new Date()).getMonth() + 1
                },
                dayDef: (new Date()).getDate(),
                timeDef: 16,
                yearDef: moment().year()
            }
            let setDateDefault = moment(new Date(setDefault.yearDef, setDefault.monthDef.value - 1, setDefault.dayDef, setDefault.timeDef)).format('LLLL')
            setAmount(setDefault.amountDef);
            setMonth(setDefault.monthDef);
            setDay(setDefault.dayDef);
            setTime(setDefault.timeDef);
            setYear(setDefault.yearDef);
            setDateSelected(setDateDefault);
            // console.log(setDefault, setDateDefault);
        } 
        
    }, [saveEmail, email])

    // console.log(dateSelected)
    // console.log(dateSelected.indexOf('Sunday'), dateSelected.indexOf('Saturday'))

    useEffect(() => {
        setDateSelected(moment(new Date(year, month.value - 1, day, time)).format('LLLL'))
        // console.log(dateSelected);
    }, [month, day, time, year])

    const amountOnChange = (event) => {
        setNewOrder(true)
        let amountValue = parseInt(event.target.value)
        let wrongAmount = 'Sorry, amount has to be between 1 and 10'
        let noAmount = 'Add a number or use arrows'
        setAmount(amountValue)
        console.log(amount, errorAmount)
        if (amountValue < 1) {
            setErrorAmount(wrongAmount)
        } else if (amountValue > 10) {
            setErrorAmount(wrongAmount)
        } else if (isNaN(amountValue) === true) {
            setErrorAmount(noAmount)
        } else {
            setErrorAmount('')
        }
    }

    const saveOrder = () => {
        const validatedEmail = EmailValidator.validate(email);
        if (dateSelected.indexOf('Saturday') !== -1 || dateSelected.indexOf('Sunday') !== -1 ) {
            setErrorEmail('You cannot book Sunday and Saturday!')
        } else if (amount > 10 || amount < 1) {
            setErrorAmount('Sorry, amount has to be between 1 and 10')
        } else if (validatedEmail === true && saveDish.length !== 0 && saveDrinks.length !== 0) {
            setErrorEmail('');
            setSaveAmount(amount);
            setDateSelected(moment(new Date(year, month.value - 1, day, time)).format("LLLL"))
            setSaveDate(dateSelected);
            setSaveEmail(email);
        } else if (email.length === 0) {
            setErrorEmail('Sorry, email cannot be empty!')
        } else if (validatedEmail === false) {
            setErrorEmail('Sorry, email not valid!')
        } else {
            setErrorEmail('You have to pick drinks & food!')
        }
    }
    // console.log({year, currentMonth, currentYear});
    return (
        <div id="orderContainer">
            <h2>Order details</h2>
            <div id="orderWrapper">
                <div id="date">
                    <div id="dateSelect">
                        <h4 className="blueFont">1. Pick date</h4><br/>
                        <div id="dates">
                            <select value={month.name} id="month" onChange={(event) => {
                                setMonth({name: event.target.value, value: Number(moment().month(event.target.value).format("M"))});
                                setNewOrder(true)
                            }}>
                                {monthsInYear.map((month) => (
                                    <option value={month} disabled={moment().months(month).format('M') < currentMonth && year === currentYear}>{month}</option>
                                ))}
                            </select>
                            <select value={day} id="day" onChange={(event) => {
                                setDay(Number(event.target.value));
                                setNewOrder(true)
                            }}>
                                {dayRows}
                            </select>
                            <select value={year} id="year" onChange={(event) => {
                                setYear(Number(event.target.value));
                                setNewOrder(true)
                            }}>
                                {yearRows}
                            </select>
                        </div><br/>
                        <div id="timeSelect">
                            <div>
                            <h4 className="blueFont">2. Pick time</h4><br/>
                            <select value={time} id="time" onChange={(event) => {
                                setTime(event.target.value);
                                setNewOrder(true)
                            }}>
                                <option value="16">4:00 PM</option>
                                <option value="17">5:00 PM</option>
                                <option value="18">6:00 PM</option>
                                <option value="19">7:00 PM</option>
                                <option value="20">8:00 PM</option>
                                <option value="21">9:00 PM</option>
                                <option value="22">10:00 PM</option>
                                <option value="23">11:00 PM</option>
                            </select>
                            </div>
                            <div>
                                <h4 className="blueFont">3. Select amount of people</h4><br/>
                                <div id="amount">
                                    <img onClick={minusPeople} className={classNames("amountImg lessPeople",{"hidden": amount === 1 || amount < 1 || isNaN(amount), "visible": amount > 1})} src="./img/less.png" alt="less"/>
                                    <input type="number" min="1" max="10" maxLength="2" value={amount} onChange={amountOnChange} />
                                    <img onClick={addPeople} className={classNames("amountImg addPeople",{"hidden": amount === 10 || amount > 10, "visible": amount < 10 })} src="./img/more.png" alt="more"/>
                                </div>
                                <div className="errorBoxMargin"><p id="errorAmount">{errorAmount}</p></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="emailWrapper">
                    <div id="selection">
                        <h4 className="blueFont">Selected date & time:</h4><br/>
                        <p>{dateSelected}</p><br/>
                        <h4 className="blueFont">Selected amount:</h4><br/>
                        <p>{amount >= 1 && amount <= 10 ? amount : 'Choose'} people</p>
                    </div>
                
                    <div id="email">
                        <h4 className="blueFont">4. Enter your email</h4><br/>
                        <input placeholder="Enter email" id="emailInput" name="email" type="email" value={email} onChange={(event) => {
                            setEmail(event.target.value);
                            setNewOrder(true)
                            }} />
                        {
                            EmailValidator.validate(email) === true && saveDish.length !== 0 && saveDrinks.length !== 0 && amount <= 10 && amount >= 1 && dateSelected.indexOf('Saturday') === -1 && dateSelected.indexOf('Sunday') === -1 ?
                            <Link to='/receipt'>
                            <button onClick={saveOrder} className="button">{orderButton}</button>
                            </Link>
                            :
                            <button onClick={saveOrder} className="button">{orderButton}</button>
                        }
                        <div className="errorBoxMargin"><p id="error">{errorEmail}</p></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order;