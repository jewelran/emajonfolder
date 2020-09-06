import React from 'react';
import './Cart.css'
const Cart = (props) => {
    const cart = props.cart;
    // const totalPrice = cart.reduce((total , prd) => total+ prd.price,  0) for loope er poriborte eita diye kaj kore jabe... this is reduce funtion...........
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total= total+product.price;
    }

    let shipping = 0;
    if (total > 50) {
        shipping = 0 ;
    }
    else if (total > 20) {
        shipping = 20.00;
    }
    let text =(total / 10);
        const grandTotal = Math.round(total + shipping + Number(text))
        const formetNum = num=> {
        const presition = num.toFixed(2);
            return Number(presition)
    }
    return (
        <div className = 'summery_container'>
            <h2>Order summery</h2>
            <p>Total order summery : {cart.length}</p>
            <p>shipping : {formetNum(shipping)}</p>
            <p>text , VAT : {formetNum(text)}</p>
            <p>Tota price : {formetNum(grandTotal)}</p>
            <button className= "orderBtn">Oredr  Now</button>
        </div>
    );
};

export default Cart;