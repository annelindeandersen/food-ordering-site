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
    }, [saveEmail, order])

    return (
        <div id="receiptContainer">
            <div id="receiptBox">
                <h1>Receipt</h1><br/>
                <div className="info">
                    <h2 className="blueFont">Your foods & drinks</h2><br/>
                    <p><b>Dish:</b></p>
                    <div id="dishWrap">
                        <img className="smallImg" src={saveDish.strMealThumb} alt='img'/>
                        <h4>{(saveDish.strMeal)}</h4>
                    </div>
                    <p><b>Drinks:</b></p> 
                    {saveDrinks.map((drink) => ( <div key={drink} className="receiptDrink"><div className="imgBg"><img className="smallImg" alt='img' src={drink.image_url}/></div><h4>{drink.name}</h4></div> ))}<br/><br/>
                    <h2 className="blueFont">Your other info</h2><br/>
                    <p><b>Amount of people:</b> {saveAmount}</p>
                    <p><b>Date:</b> {saveDate}</p>
                    {/* <p><b>Date:</b> {moment(saveDate).format('lll')}</p> */}
                    <p><b>Email:</b> {saveEmail}</p>
                </div>
            </div>
            <Link to="/">
                <button className="button">Back to home</button>
            </Link>
        </div>
    )
}

export default Receipt;