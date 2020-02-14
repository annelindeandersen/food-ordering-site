import React from 'react';
import {Link, withRouter, useLocation, useHistory} from 'react-router-dom';
import classNames from 'classnames';
// import {useLocation} from 'react-router';

function Breadcrumbs({ setExit, saveEmail, saveDrinks, saveDish, selectedDrinkIds}) {
    // console.log({history, saveDrinks})

    let history = useHistory();
    let currentLocation = useLocation();
    // console.log(currentLocation)

    if (currentLocation.pathname === '/' || currentLocation.pathname === '/receipt') {
        return null;
    }

    const dishes = () => {
        setExit(undefined);
        if (currentLocation.pathname !== '/dishes') {
            setTimeout(() => {
                history.push('/dishes')
            }, 100)
        } else {
            history.push('/dishes')
        }
    }

    const drinks = () => {
        if (currentLocation.pathname !== '/drinks') {
            if (saveDish.length <= 0) {
                console.log('something')
            } else {
                setExit(undefined);
                setTimeout(() => {
                    history.push('/drinks')
                }, 100)
            }
        } else {
            history.push('/drinks')
        }
    }

    return(
        <div id="breadcrumbContainer">
            <div id='dishesStep' onClick={dishes} className={classNames({'activeStep': saveDish || currentLocation.pathname === '/dishes', 'currentStep': currentLocation.pathname === '/dishes'}, 'step')} to='/dishes'>Dishes</div>
            <div id='drinksStep' onClick={drinks} className={classNames({'activeStep': selectedDrinkIds.length > 0 || saveDrinks.length > 0 || currentLocation.pathname === '/drinks', 'currentStep': currentLocation.pathname === '/drinks', 'inactive': saveDish.length <= 0}, 'step')} to='/drinks'>Drinks</div>
            <Link id='orderStep' className={classNames({'activeStep': saveDrinks.length > 0 || currentLocation.pathname === '/order', 'currentStep': currentLocation.pathname === '/order', 'inactive': saveDrinks.length <= 0}, 'step')} to='/order' onClick={(e) => saveDrinks ? true : e.preventDefault() }>Order</Link>
            {/* <Link id='receiptStep' className={classNames({'activeStep': currentLocation.pathname === '/receipt', 'inactive': !saveEmail})} to='/receipt' onClick={(e) => saveEmail ? true : e.preventDefault() }>Receipt</Link> */}
        </div>
    )
}

export default withRouter(Breadcrumbs);