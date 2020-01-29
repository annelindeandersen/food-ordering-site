import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Receipt({saveDish, saveDrinks, saveDate, saveAmount, saveEmail}) {
    const [order, setOrder] = useState([{
            dish: saveDish,
            drinks: saveDrinks,
            date: saveDate,
            amount: saveAmount
    }])
    console.log(order);

    useEffect(() => {
        localStorage.setItem(saveEmail, JSON.stringify(order))
    }, [saveDish, saveDrinks, saveDate, saveAmount, saveEmail])

    return (
        <div id="receiptContainer">
            <Link to="/">
                <button className="button">Back to home</button>
            </Link>
            <div id="receiptBox">
                <h3>Receipt</h3>
                <div className="items">
                    
                </div>
                <div className="info">
                    <p>Dish: {JSON.stringify(saveDish)}</p>
                    <p>Drinks: {JSON.stringify(saveDrinks)}</p>
                    <p>Amount of people: {saveAmount}</p>
                    <p>Date: {JSON.stringify(saveDate)}</p>
                    <p>Email: {saveEmail}</p>
                </div>
            </div>
        </div>
    )
}

export default Receipt;