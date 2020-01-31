import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

const Drinks = ({saveDrinks, setSaveDrinks, saveEmail}) => {
    // const [storedDrinks, setStoredDrinks] = useState('')
    // const [isPressed, setIsPressed] = useState(false)
    let [selectedDrinkIds, setSelectedDrinkIds] = useState([]);
    const [drinks, setDrinks] = useState([
            {
                name: '',
                image_url: ''
            }
        ]);

    useEffect(() => {
        const savedDrinks = localStorage.getItem(saveEmail, saveDrinks);
        // setStoredDrinks(savedDrinks);
        const savedDrinksArr = JSON.parse(savedDrinks);
        console.log(savedDrinksArr);
        console.log(saveEmail);
        console.log(selectedDrinkIds)

        if (saveEmail) {
            setSelectedDrinkIds(savedDrinksArr[0].drinks);
        }

        const getApi = async () => {
            const result = await fetch('https://api.punkapi.com/v2/beers');
            const body = await result.json();
            console.log(body);
            setDrinks(body);
        }
        getApi();
    }, [])

    const selectDrink = ({key}) => {
        const drinksArr = [...selectedDrinkIds];

        if (key.name) {
            const drink = drinksArr.indexOf(key.name);
            console.log(drink);
            if (drink >= 0) {
                drinksArr.splice(drink, 1);
            } else {
                drinksArr.push(key.name);
                // document.getElementsByClassName('selected').style.display = 'grid';
            }
            setSelectedDrinkIds(drinksArr);
        }
    }

    return(
        <div id="drinksContainer">
            <div className="drinks">
                {drinks.map((key, index) => (
                    <div onClick={() => selectDrink({key})} className='drink'  key={key.id}>
                        <div className={classNames({'btn-pressed': selectedDrinkIds.indexOf(key.name) >= 0})}></div>
                        <img className="drinkImg" src={key.image_url} key={key.image_url} alt="img"/>
                        <h4 className="drinkTitle" key={key.name}>{key.name}</h4>
                    </div>
                ))}
            </div>
            <div id="nextBox">
                <h3>Pick date and amount next</h3>
                <div className="line"></div><br/>
                <i>Your current drinks choice:</i>
                <p><b>{(selectedDrinkIds).join(', ')}</b></p>
                <br/>
                <Link to={selectedDrinkIds.length > 0 ? '/order' : '/drinks'}>
                    <button onClick={() => setSaveDrinks(selectedDrinkIds)} className="button">Next</button>
                </Link>
            </div>
        </div>
    )
}

export default Drinks;