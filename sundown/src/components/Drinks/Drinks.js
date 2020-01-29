import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

function Drinks() {
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
        if (key.id) {
            setSelectedDrinkIds(key.id)
            console.log(selectedDrinkIds);
        }
    }

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
                <Link to="/order">
                    <button className="button">Next</button>
                </Link>
            </div>
        </div>
    )
}

export default Drinks;