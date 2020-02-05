import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { setDate } from 'date-fns/esm/fp';
import EmailValidator from 'email-validator';
import moment from 'moment';

function Order({saveAmount, setSaveAmount, saveEmail, setSaveEmail, saveDate, setSaveDate, saveDish, saveDrinks}) {
    const [month, setMonth] = useState({
        name: '',
        value: ''
    })
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');
    const [time, setTime] = useState('');
    const currentMonth = (new Date()).getMonth() + 1
    const currentYear = moment().year();

    const [dateSelected, setDateSelected] = useState('')

    let [amount, setAmount] = useState(1);
    const [email, setEmail] = useState('');
    const [orderButton, setOrderButton] = useState('Order');

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
        const savedData = localStorage.getItem(saveEmail);
        const dataParse = JSON.parse(savedData);
        console.log(dataParse, saveEmail);

        if(saveEmail) {
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
            console.log(setLocalData);
            console.log(setDateValues);
            setEmail(saveEmail);
            setOrderButton('Update order');
            document.getElementById('emailInput').disabled = 'true';
        } else {
            console.log('No logged user')
            let setDefault = {
                amountDef: 1,
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
            console.log(setDefault, setDateDefault);
        }
        
    }, [saveEmail])

    console.log(dateSelected)
    console.log(dateSelected.indexOf('Sunday'), dateSelected.indexOf('Saturday'))

    useEffect(() => {
        setDateSelected(moment(new Date(year, month.value - 1, day, time)).format('LLLL'))
        console.log(dateSelected);
    }, [month, day, time, year])

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
        }
        const validatedEmail = EmailValidator.validate(email);
        console.log(validatedEmail);
        if (dateSelected.indexOf('Saturday') !== -1 || dateSelected.indexOf('Sunday') !== -1 ) {
            document.getElementById('error').innerHTML = 'You cannot book Sunday and Saturday!';
        } else if (validatedEmail === true && saveDish.length !== 0 && saveDrinks.length !== 0) {
            setSaveAmount(amount);
            setDateSelected(moment(new Date(year, month.value - 1, day, time)).format("LLLL"))
            setSaveDate(dateSelected);
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
    console.log({year, currentMonth, currentYear});
    return (
        <div id="orderContainer">
            <h2>Order details</h2>
            <div id="orderWrapper">
                <div id="date">
                    <h4 className="blueFont">Pick date and time</h4><br/>
                    <div id="dateSelect">
                        <select value={month.name} id="month" onChange={(event) => setMonth({name: event.target.value, value: moment().month(event.target.value).format("M")})}>
                            {monthsInYear.map((month) => (
                                <option value={month} disabled={moment().months(month).format('M') < currentMonth && year === currentYear}>{month}</option>
                            ))}
                        </select>
                        <select value={day} id="day" onChange={(event) => setDay(event.target.value)}>
                            {dayRows}
                        </select>
                        <select value={year} id="year" onChange={(event) => setYear(Number(event.target.value))}>
                            {yearRows}
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
                    <p>{dateSelected}</p>
                </div>
                <div id="emailWrapper">
                    <h4 className="blueFont">Select amount of people</h4><br/>
                    <div id="amount">
                        <img onClick={minusPeople} className="amountImg lessPeople" src="./img/less.png" alt="less"/>
                        <input type="number" min="1" max="10" maxLength="2" value={amount} onChange={(event) => setAmount(parseInt(event.target.value))} />
                        <img onClick={addPeople} className="amountImg addPeople" src="./img/more.png" alt="more"/>
                    </div>
                    <div className="errorBoxMargin"><p id="errorAmount"></p></div>
                    <br/>
                    <label>Enter email</label>
                    <input placeholder="Enter email" id="emailInput" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    <Link to={EmailValidator.validate(email) === true && saveDish.length !== 0 && saveDrinks.length !== 0 && amount <= 10 && amount >= 1 && dateSelected.indexOf('Saturday') === -1 && dateSelected.indexOf('Sunday') === -1 ? '/receipt' : '/order'}>
                        <button onClick={saveOrder} className="button">{orderButton}</button>
                    </Link>
                    <div className="errorBoxMargin"><p id="error"></p></div>
                </div>
            </div>
        </div>
    )
}

export default Order;