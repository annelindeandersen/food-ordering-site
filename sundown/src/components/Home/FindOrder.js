import React from 'react';

function FindOrder() {
    return(
        <div id="findOrderContainer">
            <div id="findOrder">
                <h3>Find your order</h3>
                <div id="emailContainer">
                    <label>Enter email</label>
                    <input type="email"/>
                    <button className="button">Find</button>
                </div>
            </div>
            <div id="contentBox">
                <h3>Content box</h3>
            </div>
        </div>
    )
}

export default FindOrder;