import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './product.css'
import { Link } from 'react-router-dom'
const Product = (props) => {
    const { img, name, key, price, seller, stock } = props.product;
    // console.log(props)
    return (
        <div className="product-full-container">
            <div className="img-container">
                <img src={img} alt="" />
            </div>
            <div className='product-container'>
                <h4><Link to={"/" + key}>{name}</Link></h4>
                <h4>{key}</h4>
                <h4>${price}</h4>
                <p><small>By: {seller}</small></p>
                <p><small>Only {stock} left in stock order soon</small></p>
                {props.showAddToCard && <button onClick={() => props.handleAddProduct(props.product)} className="AddcartBtn"> <FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>}
                <button onClick={props.handleAddProduct} className="AddcartBtn"> <FontAwesomeIcon icon={faShoppingCart} />  Buy now</button>
                {/* <h3>{props.product.name}</h3> */}

            </div>
        </div>

    );
};

export default Product;