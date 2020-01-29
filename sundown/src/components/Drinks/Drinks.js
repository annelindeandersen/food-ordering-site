import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

const Drinks = ({saveDrinks, setSaveDrinks}) => {
// function Drinks(dish) {
    // const [savedDish, setSavedDish] = useState({dish});
    // console.log(savedDish);
    let [selectedDrinkIds, setSelectedDrinkIds] = useState([]);
    const [drinks, setDrinks] = useState([
            {
                name: '',
                image_url: ''
            }
        ]);

    useEffect(() => {

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
                drinksArr.push(key.name)
            }
            setSelectedDrinkIds(drinksArr);
        }
    }

    // useEffect(() => {
    //     // localStorage.getItem('drinks', JSON.parse(selectedDrinkIds));
        
    //     localStorage.setItem('drinks', JSON.stringify(selectedDrinkIds));
    // }, [selectedDrinkIds])

    return(
        <div id="drinksContainer">
            <div className="drinks">
                {drinks.map((key, index) => (
                    <div onClick={() => selectDrink({key})} className="drink" key={key.id}>
                        <img className="drinkImg" src={key.image_url} key={key.image_url} alt="img"/>
                        <h4 className="drinkTitle" key={key.name}>{key.name}</h4>
                    </div>
                ))}
            </div>
            <div id="nextBox">
                <h3>Pick date and amount next</h3>
                <hr/><br/>
                <i>Your current drinks choice:</i>
                <p>{JSON.stringify(selectedDrinkIds).join(',')}</p>
                {/* <p>{JSON.stringify(selectedDrinkIds).replace(/[\[\]"']+/g, ' ')}</p> */}
                <br/>
                <Link to="/order">
                    <button onClick={() => setSaveDrinks(selectedDrinkIds)} className="button">Next</button>
                </Link>
            </div>
        </div>
    )
}

export default Drinks;