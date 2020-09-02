import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee ,faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import './product.css'
const Product = (props) => {
    const { img, name, key, price, seller, stock } = props.product;
    // console.log(props.product.name)
    return (
        <div className="product-full-container">
            <div className="img-container">
                <img src={img} alt="" />
            </div>
            <div className='product-container'>
                <h4>{name}</h4>
                <h4>{key}</h4>
                <h4>${price}</h4>
                <p><small>By: {seller}</small></p>
                <p><small>Only {stock} left in stock order soon</small></p>
                <button onClick={ () => props.handleAddProduct(props.product)} className="AddcartBtn"> <FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>
                <button onClick={props.handleAddProduct} className="AddcartBtn"> <FontAwesomeIcon icon={faShoppingCart} />  Buy now</button>
                {/* <h3>{props.product.name}</h3> */}

            </div>
        </div>

    );
};

export default Product;