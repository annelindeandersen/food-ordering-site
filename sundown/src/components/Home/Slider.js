import React from 'react';
// import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {Link} from 'react-router-dom';
 
function Slider({saveDish, saveDrinks, saveDate, saveAmount, saveEmail}) {

    
    return(
        <div id="sliderContainer">
            <div id="slider">
                <Carousel showThumbs={false} autoPlay={true}>
                    <div>
                        <img src="./img/food1.jpg" alt="food" />
                    </div>
                    <div>
                        <img src="./img/drink2.jpg" alt="food" />
                    </div>
                    <div>
                        <img src="./img/food2.jpg" alt="food" />
                    </div>
                </Carousel>
            </div>
            <div id="orderflow">
                <h3>Order flow box</h3>
                <div className="order">
                    <p>{saveDish ? `Dish: ${saveDish}` : 'Nothing added yet'}</p>
                    <p>{saveDrinks ? `Drinks: ${saveDrinks}` : ''}</p>
                    <p>{saveDate ? `Date: ${JSON.stringify(saveDate)}` : ''}</p>
                    <p>{saveAmount ? `Amount: ${saveAmount}` : ''}</p>
                    <p>{saveEmail ? `Email: ${saveEmail}` : ''}</p>
                </div>
                <Link to="/dishes">
                    <button className="button">Order</button>
                </Link>
            </div>
        </div>
    )
}
// class Slider extends React.Component {
//     render() {
//         return(
//             <div id="sliderContainer">
//                 <div id="slider">
//                     <Carousel showThumbs={false} autoPlay={true}>
//                         <div>
//                             <img src="./img/food1.jpg" alt="food" />
//                         </div>
//                         <div>
//                             <img src="./img/drink2.jpg" alt="food" />
//                         </div>
//                         <div>
//                             <img src="./img/food2.jpg" alt="food" />
//                         </div>
//                     </Carousel>
//                 </div>
//                 <div id="orderflow">
//                     <h3>Order flow box</h3>
//                     <div className="order"></div>
//                     <Link to="/dishes">
//                         <button className="button">Order</button>
//                     </Link>
//                 </div>
//             </div>
//         )
//     }
// }

// ReactDOM.render(<Slider />, document.querySelector('.demo-carousel'));

export default Slider;