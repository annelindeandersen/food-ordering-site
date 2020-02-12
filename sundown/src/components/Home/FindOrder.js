import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import EmailValidator from 'email-validator';

function FindOrder({saveEmail, setSaveEmail, setSaveDish, setSaveDrinks, setSaveDate, setSaveAmount}) {
    const [message, setMessage] = useState('');
    const [storedData, setStoredData] = useState('');
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState('');

    console.log(EmailValidator.validate(saveEmail))

    useEffect(() => {
        const getData = localStorage.getItem(saveEmail);
        setStoredData(getData);
        const dataParse = JSON.parse(getData);
        console.log(JSON.parse(getData))
        if (getData !== null) {
            if (EmailValidator.validate(saveEmail) === true) {
                setSaveAmount(dataParse[0].amount);
                setSaveDrinks(dataParse[0].drinks);
                setSaveDate(dataParse[0].date);
                setSaveDish(dataParse[0].dish);
            }
        }

        if (saveEmail.length !== 0) {
            setMessage('');
        }

    }, [saveEmail])

    const findOrder = () => {
        if (saveEmail.length === 0) {
            setMessage('Email field cannot be empty!');
            console.log(saveEmail)
        } else if (EmailValidator.validate(saveEmail) === false) {
            setMessage('Email not valid!');
        } else if (storedData === null) {
            setMessage('Not in database');
        } else if (storedData !== null) {
            setModal(true);
            setMessage('');
            console.log(modal)
        }
    }

    return(
        <div id="findOrderContainer">
            <div id="findOrder">
                <h3>Find your order</h3>
                <div id="emailContainer">
                    <label>Enter email</label>
                    <input placeholder="Enter email" name="email" id="email" type="email" value={saveEmail} onChange={(event) => setSaveEmail(event.target.value)} />
                </div>
                <button onClick={findOrder} className="button">Find</button>
                <b id="emailError">{message}</b>
            </div>
            <div id="contentBox">
                <h3>Content box</h3><br/>
                <p>Lorizzle ipsizzle dolizzle fizzle yippiyo, consectetuer adipiscing elizzle. Nullizzle sapien ma nizzle, sure volutpizzle, suscipit the bizzle, pimpin' dizzle, arcu. Pellentesque sizzle ass. Yo mamma erizzle. For sure we gonna chung crackalackin funky fresh turpizzle tempizzle doggy. Maurizzle pellentesque et turpizzle.<br/><br/> Vestibulum pizzle funky fresh. Pellentesque eleifend gangster . In own yo' mah nizzle platea dictumst. Brizzle dapibizzle. Crunk tellus urna, pretizzle eu, mattis ac, things vitae, nunc. My shizz suscipizzle. Integer sempizzle bow wow wow sed purus.</p>
            </div>
            <div id="modalWrapper" className={classNames({"visible": modal === true, "hidden": modal === false})}>
                <div className="modalContent" >
                    <h2>Yay, we found your order! 🍺</h2>
                    <div className="buttonWrapper">
                        <Link to="/receipt">
                            <button className="button">Show receipt</button>
                        </Link>
                        <Link to={{pathname: "/dishes", state: { saveEmail }}}>
                            <button className="button">Update order</button>
                        </Link>
                    </div>
                    <br/>
                    <h3 onClick={() => setModal(false)}>CLOSE</h3>
                </div>
            </div>
        </div>
    )
}

export default FindOrder;