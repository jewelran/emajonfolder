import React, { useEffect, useState } from 'react';
import Cart from '../components/Cart/Cart';
import ReviewItem from '../components/ReviewItem/ReviewItem';
import fakeData from '../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../utilities/databaseManager';
import './Review.css'
import happyImg from '../images/giphy.gif'
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart , setCart] = useState([]);
    const removeProduct  = ((productKey) => {
        // console.log("click me",productKey)
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey)
    } )
useEffect(() => {
    const saveCart = getDatabaseCart();
    const productKeys = Object.keys(saveCart);
   const cartProduct = productKeys.map(key => {
       const product = fakeData.find( pd => pd.key === key);
       product.quantity = saveCart[key]
       return product;
   });
//    console.log(cartProduct) 
    setCart(cartProduct)
},[])
 
const [orderPlace ,setOrderPlace] =useState(false);
const history = useHistory()
const handleProceedChekout = () => {
    //for submit order.........
    // setCart([]);
    // setOrderPlace(true);
    // processOrder();
    // console.log('thank you')
    history.push("/shipment")

}
    
    let thankYou;
    if (orderPlace) {
        thankYou = <img src={happyImg} alt=""/>
    }
    return (
        <div className="full_container">
            <div className="summery_container">
            
                {
                    cart.map(pd => <ReviewItem 
                        key = {pd.key} 
                        removeProduct ={removeProduct}
                        product={pd}>
                        </ReviewItem>)
                }
                <h5>Thank you for choosing ema-jon.com.</h5>
                {
                    thankYou
                }
            
            </div>
            <div className="cart-container">
                 <Cart cart = {cart}>
                <button onClick={handleProceedChekout} className= "orderBtn">Proceed chekout</button>
                 </Cart>
            </div>
        </div>
      
    );
};

export default Review;