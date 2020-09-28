import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    const {name,quantity,price,img,key} = props.product
    // console.log(props)
   
    return (
        <div className='review_container'>
            <div style={{marginLeft:'50px',marginRight:'10rem'}}>
            <img src={img} alt=""/>
            </div>
            <div style={{textAlign:"left",width:"60%"}}>
            <p>{name}</p>
            <h4>price: {price}</h4>
             <p>Quantity: {quantity}</p>
             <button className="orderBtn" onClick={ () => props.removeProduct(key)}>Remove</button>
            </div>
          
        </div>
    );
};

export default ReviewItem;