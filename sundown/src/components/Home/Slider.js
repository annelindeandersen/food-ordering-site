import React, { useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Flickity from 'flickity';
import {Link} from 'react-router-dom';
import EmailValidator from 'email-validator';
 
function Slider({saveDish, setSaveDish, saveDrinks, setSaveDrinks, saveDate, setSaveDate, saveAmount, setSaveAmount, saveEmail}) {
    
    useEffect(() => {
        const getData = localStorage.getItem(saveEmail);
        const dataParse = JSON.parse(getData);
        console.log(dataParse);

        if(localStorage.getItem(saveEmail) !== null) {
            if (EmailValidator.validate(saveEmail) === true) {
                setSaveAmount(dataParse[0].amount);
                setSaveDrinks(dataParse[0].drinks);
                setSaveDate(dataParse[0].date);
                setSaveDish(dataParse[0].dish);
            }
        }

        var flkty = new Flickity( '.main-carousel', {
            adaptiveHeight: true,
            autoPlay: 5000,
            cellAlign: 'center',
            pageDots: true,
            resize: true,
            wrapAround: true
        })

    }, [saveEmail])
    
console.log(saveDrinks);

    return(
        <div id="sliderContainer">
            <div id="slider">
                <div className="main-carousel">
                    <div className="carousel-cell"><img src="./img/food1.jpg" alt="food" /></div>
                    <div className="carousel-cell"><img src="./img/drink2.jpg" alt="food" /></div>
                    <div className="carousel-cell"><img src="./img/food2.jpg" alt="food" /></div>
                </div>
            </div>
            <div id="orderflow">
                <h3>Order flow box</h3>
                <div className="order">
                    <h4 className="blueFont">Ready to make your order?</h4>
                    <p>Click order and go through these steps:</p><br/>
                    <li className="blueFont">Pick your dish</li>
                    <li className="blueFont">Pick 1 drink or more</li>
                    <li className="blueFont">Select time & date</li>
                    <li className="blueFont">Select amount of people</li>
                    {/* <h4 className="blueFont">{saveDish && localStorage.getItem(saveEmail) !== null ? `Your foods & drinks` : 'Nothing added yet'}</h4> */}
                    {/* <p>{saveDish && localStorage.getItem(saveEmail) !== null ? `Dish: ${saveDish.strMeal}` : ''}</p>
                    <p>{saveDrinks && saveDrinks.length > 0 && localStorage.getItem(saveEmail) !== null ? <p>Drinks: {saveDrinks.map((drink) => (<span key={drink}>{drink.name}, </span>))}</p> : ''}</p><br/>
                    <h4 className="blueFont">{saveDate && localStorage.getItem(saveEmail) !== null ? `Your other info` : ''}</h4>
                    <p>{saveDate && localStorage.getItem(saveEmail) !== null ? `Date: ${saveDate}` : ''}</p>
                    <p>{saveAmount && localStorage.getItem(saveEmail) !== null ? `Amount: ${saveAmount}` : ''}</p>
                    <p>{EmailValidator.validate(saveEmail) === true && localStorage.getItem(saveEmail) !== null ? `Email: ${saveEmail}` : ''}</p> */}
                </div>
                <Link to="/dishes">
                    <button className="button">Order</button>
                </Link>
            </div>
        </div>
    )
}

export default Slider;