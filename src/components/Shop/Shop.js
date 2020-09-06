import React from 'react';
import fakeData from '../../fakeData';
import { useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
const Shop = () => {
    const first10 = fakeData.slice(0, 20);
    const [cart, setCart] = useState([])
    const [product, setProduct] = useState(first10);
    const handleAddProduct = (product) =>{
        // console.log(product)
       const newCart = [...cart ,product];
       setCart(newCart)
    }
    return (
        <div className="shot_container">
            <div className="product_container">
                {
                    product.map(
                        pd => <Product
                        handleAddProduct={handleAddProduct}
                        product= {pd}>
                        </Product>)
                    
                }
             
        </div>
       <div className="curd-container">
           <Cart cart = {cart}></Cart>
       </div>
        </div>
    );
};

export default Shop;