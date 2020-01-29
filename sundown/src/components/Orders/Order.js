import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {setHours, setMinutes, getDay} from "date-fns";
import {Link} from "react-router-dom";

function Order({saveAmount, setSaveAmount, saveEmail, setSaveEmail, saveDate, setSaveDate}) {
    let [amount, setAmount] = useState(1);
    const [email, setEmail] = useState('');
    const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 0), 16));
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

    // useEffect(() => {
    //     localStorage.setItem('date', startDate);
    //     localStorage.setItem('amount', amount);
    //     localStorage.setItem('email', email);
    // }, [startDate, amount, email])

    const saveOrder = () => {
        setSaveAmount(amount);
        setSaveDate(startDate);
        setSaveEmail(email);
    }

    return (
        <div id="orderContainer">
            <h2>Order details</h2>
            <div id="orderWrapper">
                <div id="date">
                    <h4>Pick date and time</h4>
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
                    <h4>Select amount of people</h4>
                    <div id="amount">
                        <img onClick={minusPeople} className="amountImg" src="./img/less.png" alt="less"/>
                        <h1>{amount}</h1>
                        <img onClick={addPeople} className="amountImg" src="./img/more.png" alt="more"/>
                    </div>
                    <label>Enter email</label>
                    <input name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
            </div>
            <Link to="/receipt">
                <button onClick={saveOrder} className="button">Order</button>
            </Link>
        </div>
    )
}

export default Order;