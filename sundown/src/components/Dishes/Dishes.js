import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

function Dishes() {

    const [dish, setDish] = useState({
        meals: [
            {
                strMeal: ''
            }
        ]
    });

    useEffect(() => {

        const getApi = async () => {
            const result = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const body = await result.json();
            console.log(body);
            setDish(body);
        }
        getApi();
    }, [])

    const reloadPage = () => {
        window.location = "/dishes";
    }

    return(
        <div id="dishesContainer">
            <div className="dish">
                {dish.meals.map((key, index) => (
                    <div key={key.idMeal}>
                        <img className="dishImg" src={key.strMealThumb} key={key.strMealThumb} alt="img"/>
                        <h3 className="dishTitle" key={key.strMeal}>{key.strMeal}</h3>
                        <p className="dishDesc" key={key.strInstructions}>{key.strInstructions}</p>
                    </div>
                ))}
                <button onClick={reloadPage} className="button">Generate new</button>
            </div>
            <div id="nextBox">
                <h3>Pick drinks next</h3>
                <Link to="/drinks">
                    <button className="button">Next</button>
                </Link>
            </div>
        </div>
    )
}

export default Dishes;