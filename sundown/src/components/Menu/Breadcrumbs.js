import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import classNames from 'classnames';
import {useLocation} from 'react-router';

function Breadcrumbs({history, saveEmail, saveDrinks, selectedDrinkIds}) {
    // console.log({history, saveDrinks})

    let currentLocation = useLocation();
    // console.log(currentLocation)

    if (currentLocation.pathname === '/') {
        return null;
    }

    return(
        <div id="breadcrumbContainer">
            <Link id='dishesStep' className={classNames({'activeStep': currentLocation.pathname === '/dishes'})} to='/dishes'>Dishes</Link>
            <Link id='drinksStep' className={classNames({'activeStep': currentLocation.pathname === '/drinks'})} to='/drinks'>Drinks</Link>
            <Link id='orderStep' className={classNames({'activeStep': currentLocation.pathname === '/order', 'inactive': saveDrinks.length <= 0})} to='/order' onClick={(e) => saveDrinks ? true : e.preventDefault() }>Order</Link>
            <Link id='receiptStep' className={classNames({'activeStep': currentLocation.pathname === '/receipt', 'inactive': !saveEmail})} to='/receipt' onClick={(e) => saveEmail ? true : e.preventDefault() }>Receipt</Link>
        </div>
    )
}

export default withRouter(Breadcrumbs);