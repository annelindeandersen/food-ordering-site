import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

const Drinks = ({selectedDrinkIds, setSelectedDrinkIds, saveDrinks, setSaveDrinks, saveEmail}) => {
    const [message, setMessage] = useState('');
    const [drinks, setDrinks] = useState([
            {
                name: '',
                image_url: ''
            }
        ]);

    useEffect(() => {
        const savedDrinks = localStorage.getItem(saveEmail, saveDrinks);
        const savedDrinksArr = JSON.parse(savedDrinks);
        console.log(savedDrinksArr);
        console.log(saveEmail);
        console.log(saveDrinks)
        if (saveDrinks) {
            const mapSavedDrinks = saveDrinks.map(drink => (drink.name))
            console.log(mapSavedDrinks)
            setSelectedDrinkIds(mapSavedDrinks);
        }
        if (saveEmail) {
            const mapDrinks = savedDrinksArr[0].drinks.map((drink) => (drink.name));
            console.log(mapDrinks);
            setSelectedDrinkIds(mapDrinks);
        } 
        const getApi = async () => {
            const result = await fetch('https://api.punkapi.com/v2/beers');
            const body = await result.json();
            console.log(body);
            setDrinks(body);
        }
        getApi();
    }, [saveEmail, saveDrinks, setSelectedDrinkIds])


    const toggleDrink = ({key}) => {
        const drinksArr = [...selectedDrinkIds];
        setMessage('');
        if (key.name) {
            const drink = drinksArr.indexOf(key.name);
            console.log(drink);
            if (drink >= 0) {
                drinksArr.splice(drink, 1);
            } else {
                drinksArr.push(key.name);
            }
            setSelectedDrinkIds(drinksArr);
            console.log(drinksArr)
        }
    }

    const selectedDrinks = drinks.filter(drink => selectedDrinkIds.indexOf(drink.name) !== -1);
    // console.log(selectedDrinks)

    const setDrinkOrError = () => {
        setSaveDrinks(selectedDrinks);
        console.log(saveDrinks);
        if(selectedDrinks.length === 0) {
            console.log('no saved drinks')
            setMessage('Please select your drink!');
        }
    }

    return(
        <div id="drinksContainer">
            <div className="drinks">
                {drinks.map((key, index) => (
                    <div onClick={() => toggleDrink({key})} className='drink'  key={index}>
                        <div className={classNames({'btn-pressed': selectedDrinkIds.indexOf(key.name) >= 0})}></div>
                        <img className="drinkImg" src={key.image_url} alt="img"/>
                        <h4 className="drinkTitle" >{key.name}</h4>
                    </div>
                ))}
            </div>
            <div id="nextBox">
                <h3>Pick date and amount next</h3>
                <div className="line"></div><br/>
                <i>Your current drinks choice:</i>
                <div id="drinksSelected">
                {selectedDrinks.map((key) => (
                    <div className="selectedDrink" key={key.name}>
                        <div>
                            <div className="imgBg"><img className='smallImg' src={key.image_url} alt='img' /></div>
                            <b>{key.name}</b>
                        </div>
                        <div className="unSelect" onClick={() => toggleDrink({key})}>X</div>
                    </div>
                ))}
                </div>
                <br/>
                {selectedDrinkIds.length > 0 ?
                <Link to='/order'>
                    <button onClick={setDrinkOrError} className="button">Next</button>
                </Link>
                :
                <button onClick={setDrinkOrError} className="button">Next</button>
            }
            <b id="drinksError">{message}</b>
            </div>
        </div>
    )
}

export default Drinks;