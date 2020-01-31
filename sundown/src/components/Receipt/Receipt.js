import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';

function Receipt({saveDish, setSaveDish, saveDrinks, setSaveDrinks, saveDate, setSaveDate, saveAmount, setSaveAmount, saveEmail}) {
    const [order, setOrder] = useState([{
            dish: saveDish,
            drinks: saveDrinks,
            date: saveDate,
            amount: saveAmount
    }])
    console.log(order);

    useEffect(() => {        
        localStorage.setItem(saveEmail, JSON.stringify(order))
    }, [saveEmail])

    return (
        <div id="receiptContainer">
            <div id="receiptBox">
                <h2>Receipt</h2><br/>
                <div className="info">
                    <h3 className="blueFont">{saveDish ? `Your foods & drinks` : 'Nothing added yet'}</h3><br/>
                    <p>{saveDish ? `Dish: ${(saveDish.strMeal)}` : ''}</p>
                    <p>{saveDrinks ? `Drinks: ${(saveDrinks).join(', ')}` : ''}</p><br/><br/>
                    <h3 className="blueFont">{saveDate ? `Your other info` : ''}</h3><br/>
                    <p>{saveAmount ? `Amount of people: ${saveAmount}` : ''}</p>
                    <p>{saveDate ? `Date: ${moment(saveDate).format('lll')}` : ''}</p>
                    {/* <p>{saveDate ? `Date: ${(saveDate).toString()}` : ''}</p> */}
                    <p>{saveEmail ? `Email: ${saveEmail}` : ''}</p>
                </div>
            </div>
            <Link to="/">
                <button className="button">Back to home</button>
            </Link>
        </div>
    )
}

export default Receipt;