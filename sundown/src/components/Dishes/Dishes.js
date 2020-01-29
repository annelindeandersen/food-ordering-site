import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

function Dishes({saveDish, setSaveDish, saveEmail}) {
    const [dish, setDish] = useState({
        meals: [
            {
                strMeal: ''
            }
        ]
    });

    useEffect(() => {
        const savedDish = localStorage.getItem(saveEmail);
        console.log(savedDish);
    }, [saveEmail])

    useEffect(() => {
        const getApi = async () => {
            const result = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const body = await result.json();
            console.log(body);
            setDish(body);
        }
        getApi();
    }, [])

    const newDish = async () => {
        const result = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const body = await result.json();
        console.log(body);
        setDish(body);
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
                <button onClick={newDish} className="button">Generate new</button>
            </div>
            <div id="nextBox">
                <h3>Pick drinks next</h3>
                <hr/><br/>
                <i>Your current dish choice:</i><p>{dish.meals[0].strMeal}</p><br/>
                <Link to="/drinks">
                    <button onClick={() => setSaveDish(dish.meals[0])} className="button">Next</button>
                </Link>
            </div>
        </div>
    )
}

export default Dishes;