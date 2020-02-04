import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

function FindOrder({saveEmail, setSaveEmail}) {

    useEffect(() => {
        const getData = localStorage.getItem(saveEmail);
        if (getData == null) {
            console.log(getData)
        }
    }, [saveEmail])

    return(
        <div id="findOrderContainer">
            <div id="findOrder">
                <h3>Find your order</h3>
                <div id="emailContainer">
                    <label>Enter email</label>
                    <b id="emailError">Email field cannot be empty</b>
                    <input placeholder="Enter email" name="email" id="email" type="email" value={saveEmail} onChange={(event) => setSaveEmail(event.target.value)} className={classNames({'input-error': saveEmail.length == 0})} />
                </div>
                <Link to={ saveEmail.length !== 0 ? '/dishes' : '/'}>
                    <button onClick={() => saveEmail.length !== 0 ? console.log(saveEmail) : document.getElementById('emailError').style.display = 'block'} className="button">Find</button>
                </Link>
            </div>
            <div id="contentBox">
                <h3>Content box</h3><br/>
                <p>Lorizzle ipsizzle dolizzle fizzle yippiyo, consectetuer adipiscing elizzle. Nullizzle sapien ma nizzle, sure volutpizzle, suscipit the bizzle, pimpin' dizzle, arcu. Pellentesque sizzle ass. Yo mamma erizzle. For sure we gonna chung crackalackin funky fresh turpizzle tempizzle doggy. Maurizzle pellentesque et turpizzle.<br/><br/> Vestibulum pizzle funky fresh. Pellentesque eleifend gangster . In own yo' mah nizzle platea dictumst. Brizzle dapibizzle. Crunk tellus urna, pretizzle eu, mattis ac, things vitae, nunc. My shizz suscipizzle. Integer sempizzle bow wow wow sed purus.</p>
            </div>
        </div>
    )
}

export default FindOrder;