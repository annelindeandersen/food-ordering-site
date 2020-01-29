import React from 'react';

function FindOrder({saveEmail, setSaveEmail}) {

    // const findOrder = () => {
    //     console.log(saveEmail);
    // }

    return(
        <div id="findOrderContainer">
            <div id="findOrder">
                <h3>Find your order</h3>
                <div id="emailContainer">
                    <label>Enter email</label>
                    <input name="email" id="email" type="email" value={saveEmail} onChange={(event) => setSaveEmail(event.target.value)} />
                    <button onClick={() => console.log(saveEmail)} className="button">Find</button>
                </div>
            </div>
            <div id="contentBox">
                <h3>Content box</h3>
            </div>
        </div>
    )
}

export default FindOrder;