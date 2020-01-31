import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {Link} from 'react-router-dom';
import EmailValidator from 'email-validator';
import moment from 'moment';
 
function Slider({saveDish, setSaveDish, saveDrinks, setSaveDrinks, saveDate, setSaveDate, saveAmount, setSaveAmount, saveEmail}) {
    const [savedEmail, setSavedEmail] = useState('')

    useEffect(() => {
        const getData = localStorage.getItem(saveEmail);
        setSavedEmail(getData);
        const dataParse = JSON.parse(getData);
        console.log(dataParse);

        if(localStorage.getItem(saveEmail) !== null) {
            if (EmailValidator.validate(saveEmail) == true) {
                setSaveAmount(dataParse[0].amount);
                setSaveDrinks(dataParse[0].drinks);
                setSaveDate(dataParse[0].date);
                setSaveDish(dataParse[0].dish.strMeal);
            }
        }
    }, [saveEmail])
    
    return(
        <div id="sliderContainer">
            <div id="slider">
                <Carousel showThumbs={false} autoPlay={true}>
                    <div>
                        <img src="./img/food1.jpg" alt="food" />
                    </div>
                    <div>
                        <img src="./img/drink2.jpg" alt="food" />
                    </div>
                    <div>
                        <img src="./img/food2.jpg" alt="food" />
                    </div>
                </Carousel>
            </div>
            <div id="orderflow">
                <h3>Order flow box</h3>
                <div className="order">
                    <h4 className="blueFont">{saveDish && localStorage.getItem(saveEmail) !== null ? `Your foods & drinks` : 'Nothing added yet'}</h4>
                    <p>{saveDish && localStorage.getItem(saveEmail) !== null ? `Dish: ${saveDish}` : ''}</p>
                    <p>{saveDrinks && localStorage.getItem(saveEmail) !== null ? `Drinks: ${(saveDrinks).join(', ')}` : ''}</p>
                    <h4 className="blueFont">{saveDate && localStorage.getItem(saveEmail) !== null ? `Your other info` : ''}</h4>
                    <p>{saveDate && localStorage.getItem(saveEmail) !== null ? `Date: ${moment(saveDate).format('lll')}` : ''}</p>
                    {/* <p>{saveDate ? `Date: ${(saveDate).toString()}` : ''}</p> */}
                    <p>{saveAmount && localStorage.getItem(saveEmail) !== null ? `Amount: ${saveAmount}` : ''}</p>
                    <p>{EmailValidator.validate(saveEmail) == true && localStorage.getItem(saveEmail) !== null ? `Email: ${saveEmail}` : ''}</p>
                </div>
                <Link to="/dishes">
                    <button className="button">Order</button>
                </Link>
            </div>
        </div>
    )
}

export default Slider;