import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import EmailValidator from 'email-validator';

function Dishes({saveDish, setSaveDish, saveEmail}) {
    const theSavedDish = saveDish
    const [savedEmail, setSavedEmail] = useState(-1)
    const [dish, setDish] = useState({
        meals: [
            {
                strMeal: '',
                strInstructions: '',
                strMealThumb: ''
            }
        ]
    });

    useEffect(() => {
        const savedDish = localStorage.getItem(saveEmail);
        console.log(saveEmail)
        const savedDishArr = JSON.parse(savedDish);

        if (saveDish) {
            setDish({
                meals: [
                    {
                        strMeal: saveDish.strMeal,
                        strInstructions: saveDish.strInstructions,
                        strMealThumb: saveDish.strMealThumb
                    }
                ]
            })
            document.querySelector('.dishImg').style.display = 'none';
        } else if (localStorage.getItem(saveEmail) !== null) {
            // if (localStorage.getItem(saveEmail) !== null) {
            setDish({
                meals: [
                    {
                        strMeal: savedDishArr[0].dish.strMeal,
                        strInstructions: savedDishArr[0].dish.strInstructions,
                        strMealThumb: savedDishArr[0].dish.strMealThumb
                    }
                ]
            })
            document.querySelector('.dishImg').style.display = 'none';
            console.log(dish, 'new'); 
        } else {
            getApi();
        }
    }, [saveEmail])

    const getApi = async () => {
        const result = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const body = await result.json();
        console.log(body);
        setDish(body);
        setSaveDish(body.meals[0]);
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
                <button onClick={getApi} className="button">Generate new</button>
            </div>
            <div id="nextBox">
                <h3>Pick drinks next</h3>
                <div className="line"></div>
                <br/>
                <i>Your current dish choice:</i><p><b>{dish.meals[0].strMeal}</b></p><br/>
                <Link to="/drinks">
                    <button onClick={() => setSaveDish(dish.meals[0])} className="button">Next</button>
                </Link>
            </div>
        </div>
    )
}

export default Dishes;