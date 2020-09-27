import React, { useEffect, useState } from 'react';
import Cart from '../components/Cart/Cart';
import ReviewItem from '../components/ReviewItem/ReviewItem';
import fakeData from '../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../utilities/databaseManager';
import './Review.css'

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
            
                <button className='orderBtn'>Order Now</button>
            </div>
            <div className="cart-container">
                 <Cart cart = {cart}></Cart>
            </div>
        </div>
      
    );
};

export default Review;