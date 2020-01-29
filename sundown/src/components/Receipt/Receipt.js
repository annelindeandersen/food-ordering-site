import React from 'react';
import {Link} from 'react-router-dom';

function Receipt({email}) {
    const receiptEmail = email;
    return (
        <div id="receiptContainer">
            <Link to="/">
                <button className="button">Back to home</button>
            </Link>
            <div id="receiptBox">
                <h3>Receipt</h3>
                <div className="items">
                    
                </div>
                <div className="info">
                    <p>{receiptEmail}</p>
                </div>
            </div>
        </div>
    )
}

export default Receipt;