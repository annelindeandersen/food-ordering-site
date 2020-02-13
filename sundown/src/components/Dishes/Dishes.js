import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import classNames from 'classnames';

function Dishes({setExit, setEnter, enter, exit, saveDish, setSaveDish, saveEmail}) {
    const history = useHistory();
    console.log(history)
    console.log(exit)
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
        setExit('')
        if (history.location.pathname === '/dishes') {
            setTimeout(() => {
                setExit(false); 
            }, 150)
        }
    }, [history])

    useEffect(() => {
        const savedDish = localStorage.getItem(saveEmail);
        console.log(saveEmail)
        const savedDishArr = JSON.parse(savedDish);
        console.log(savedDishArr, saveDish)

        if (saveDish !== '') {
            console.log('1')
            setDish({
                meals: [
                    {
                        strMeal: saveDish.strMeal,
                        strInstructions: saveDish.strInstructions,
                        strMealThumb: saveDish.strMealThumb
                    }
                ]
            })
        } else if (savedDishArr !== null) {
            console.log('2', saveEmail)
            setDish({
                meals: [
                    {
                        strMeal: savedDishArr[0].dish.strMeal,
                        strInstructions: savedDishArr[0].dish.strInstructions,
                        strMealThumb: savedDishArr[0].dish.strMealThumb
                    }
                ]
            })
        } else {
            console.log('3')
            getApi();
        }
    }, [saveEmail])

    const getApi = async () => {
        const result = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const body = await result.json();
        console.log(body);
        setDish(body);
        // setSaveDish(body.meals[0]);
    }

    const generateNew = async () => {
        const result = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const body = await result.json();
        console.log(body);
        setDish(body);
        setSaveDish(body.meals[0]);
    }

    const saveAndExit = async () => {
        setSaveDish(dish.meals[0]);
        await setExit(true);
        setTimeout(() => {
            history.push('/drinks', { exit });
        }, 350);
    }

    return(
        <div id="dishesContainer">
            <div className={classNames({'dishMoveOut': exit === true, 'dishMoveIn': exit === false},"dish")}>
                {dish.meals.map((key, index) => (
                    <div key={index}>
                        <img className="dishImg" src={key.strMealThumb} alt="img"/>
                        <h3 className="dishTitle">{key.strMeal}</h3>
                        <p className="dishDesc">{key.strInstructions}</p>
                    </div>
                ))}
                <button onClick={generateNew} className="button">Generate new</button>
            </div>
            <div id="nextBox">
                <h3>Pick drinks next</h3>
                <div className="line"></div>
                <br/>
                <i>Your current dish choice:</i><p><b>{dish.meals[0].strMeal}</b></p><br/>
                {/* <Link to="/drinks"> */}
                <button onClick={saveAndExit} className="button">Next</button>
                {/* </Link> */}
            </div>
        </div>
    )
}

export default Dishes;