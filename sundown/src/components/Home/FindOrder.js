import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import EmailValidator from 'email-validator';

function FindOrder({saveEmail, setSaveEmail}) {
    const [message, setMessage] = useState('');
    const [storedData, setStoredData] = useState('');

    console.log(EmailValidator.validate(saveEmail))

    useEffect(() => {
        const getData = localStorage.getItem(saveEmail);
        setStoredData(getData);
        console.log(JSON.parse(getData))
        if (getData === null) {
            console.log(getData)
        }

        if (saveEmail.length !== 0) {
            setMessage('');
        }
    }, [saveEmail])

    return(
        <div id="findOrderContainer">
            <div id="findOrder">
                <h3>Find your order</h3>
                <div id="emailContainer">
                    <label>Enter email</label>
                    <input placeholder="Enter email" name="email" id="email" type="email" value={saveEmail} onChange={(event) => setSaveEmail(event.target.value)} className={classNames({'input-error': saveEmail.length === 0})} />
                </div>
                {saveEmail.length !== 0 && EmailValidator.validate(saveEmail) !== false && storedData !== null ?
                <Link to={ saveEmail.length !== 0 ? '/dishes' : '/'}>
                    <button onClick={() => saveEmail.length !== 0 ? setMessage('') : setMessage('Email field cannot be empty!')} className="button">Find</button>
                </Link>
                :
                <button onClick={() => {
                    if (saveEmail.length === 0) {
                        setMessage('Email field cannot be empty!');
                    } else if (EmailValidator.validate(saveEmail) === false) {
                        setMessage('Email not valid!');
                    } else if (storedData === null) {
                        setMessage('Not in database');
                    }
                }} className="button">Find</button>
                }
                <b id="emailError">{message}</b>
            </div>
            <div id="contentBox">
                <h3>Content box</h3><br/>
                <p>Lorizzle ipsizzle dolizzle fizzle yippiyo, consectetuer adipiscing elizzle. Nullizzle sapien ma nizzle, sure volutpizzle, suscipit the bizzle, pimpin' dizzle, arcu. Pellentesque sizzle ass. Yo mamma erizzle. For sure we gonna chung crackalackin funky fresh turpizzle tempizzle doggy. Maurizzle pellentesque et turpizzle.<br/><br/> Vestibulum pizzle funky fresh. Pellentesque eleifend gangster . In own yo' mah nizzle platea dictumst. Brizzle dapibizzle. Crunk tellus urna, pretizzle eu, mattis ac, things vitae, nunc. My shizz suscipizzle. Integer sempizzle bow wow wow sed purus.</p>
            </div>
        </div>
    )
}

export default FindOrder;