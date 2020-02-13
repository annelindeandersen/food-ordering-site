import React, { useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Flickity from 'flickity';
import {useHistory} from 'react-router-dom';
import EmailValidator from 'email-validator';
 
function Slider({ setSelectedDrinkIds, setSaveEmail, saveDish, setSaveDish, saveDrinks, setSaveDrinks, saveDate, setSaveDate, saveAmount, setSaveAmount, saveEmail}) {

    useEffect(() => {
        // const getData = localStorage.getItem(saveEmail);
        // const dataParse = JSON.parse(getData);
        // console.log(dataParse);

        // if(localStorage.getItem(saveEmail) !== null) {
        //     if (EmailValidator.validate(saveEmail) === true) {
        //         setSaveAmount(dataParse[0].amount);
        //         setSaveDrinks(dataParse[0].drinks);
        //         setSaveDate(dataParse[0].date);
        //         setSaveDish(dataParse[0].dish);
        //     }
        // }

        var flkty = new Flickity( '.main-carousel', {
            adaptiveHeight: true,
            autoPlay: 5000,
            cellAlign: 'center',
            pageDots: true,
            resize: true,
            wrapAround: true
        })

    }, [])
    const history = useHistory();
    
    const startNewOrder = () => {
        setSaveEmail('');
        setSaveDrinks('');
        setSaveDate('');
        setSaveDish('');
        setSelectedDrinkIds([]);

        return history.push('/dishes');
    };
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
                </div>
                <button onClick={() => startNewOrder()} className="button">Order</button>
            </div>
        </div>
    )
}

export default Slider;