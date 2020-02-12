import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

function Menu() {
    const addDegrees = 540;
    let [currentDegree, setCurrentDegree] = useState(0);
    const logo = document.getElementById('logo');
    const [mouseOver, setMouseOver] = useState(false)
    const [loadClass, setLoadClass] = useState('none');
    let currentLocation = useLocation();
    console.log(currentLocation);

    useEffect(() => {
        if (currentLocation.pathname === '/receipt') {
            setLoadClass('none');
            setTimeout(() => {
                setLoadClass('menuRoll');
                console.log(loadClass);
            }, 100);
        } else if (currentLocation.pathname === '/') {
            setLoadClass('menuStay');
        }
    },[currentLocation])

    if (currentLocation.pathname !== '/' && currentLocation.pathname !== '/receipt') {
        return null;
    }

    return(
        <div id="menuContainer" className={loadClass}>
            <Link to='/' >
                <img id="logo" style={{transform: `rotate(${currentDegree}deg)`}} onMouseOver={() => {setCurrentDegree(currentDegree += addDegrees)}} src="./img/beach.png" alt="logo"/>
            </Link>
            <div>Restauranter</div>
            <div>Produkter</div>
            <div>Nyhedsbrev</div>
            <div>Kontakt</div>
            <h2>MENU</h2>
        </div>
    )
}

export default Menu;