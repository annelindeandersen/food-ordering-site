import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router';
import {Link} from 'react-router-dom';
// import classNames from 'classnames';

function Menu() {
    const addDegrees = 540;
    let [currentDegree, setCurrentDegree] = useState(0);
    const logo = document.getElementById('logo');
    const [mouseOver, setMouseOver] = useState(false)
    const [loadClass, setLoadClass] = useState('none');
    const [loadClassAnimate, setLoadClassAnimate] = useState('');
    let currentLocation = useLocation();
    console.log(currentLocation);

    useEffect(() => {
        if(currentLocation.pathname === '/receipt') {
            setLoadClassAnimate('animate')
        }
        if(currentLocation.pathname === '/') {
            setLoadClassAnimate('')
        }

        if(currentLocation.pathname === '/' || currentLocation.pathname === '/receipt') {
            setLoadClass('');
        } else {
            setLoadClass('deactive');
        }

    }, [currentLocation])

    return(
        <div id="menuContainer" className={loadClass + ' ' + loadClassAnimate}>
            <Link to='/' >
                <img id="logo" style={{transform: `rotate(${currentDegree}deg)`}} onMouseOver={() => {setCurrentDegree(currentDegree += addDegrees)}} src="./img/beach.png" alt="logo"/>
            </Link>
            <div><p>Restauranter</p></div>
            <div><p>Produkter</p></div>
            <div><p>Nyhedsbrev</p></div>
            <div><p>Kontakt</p></div>
            <h2>MENU</h2>
        </div>
    )
}

export default Menu;