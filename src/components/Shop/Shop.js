import React from 'react';
import fakeData from '../../fakeData';
import { useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart } from '../../utilities/databaseManager';
const Shop = () => {
    const first10 = fakeData.slice(0, 20);
    const [cart, setCart] = useState([])
    const [product, setProduct] = useState(first10);
    const handleAddProduct = (product) =>{
        // console.log(product)
        const toBeAdded = product.key;
       const sameProduct = cart.find(pd => pd.key === toBeAdded);
       let count = 1;
       let newCart;
       if (sameProduct) {
           count = sameProduct.quantity +1;
           sameProduct.quantity = count;
           const others = cart.filter(pd => pd.key !== toBeAdded);
           newCart = [...others, sameProduct];
       }else{
           product.quantity = 1;
           newCart = [...cart, product]
       }

       setCart(newCart);
        addToDatabaseCart(product.key, count)
    }
    return (
        <div className="shot_container">
            <div className="product_container">
                {
                    product.map(
                        pd => <Product key = {pd.key} showAddToCard ={true}
                                                handleAddProduct={handleAddProduct}
                                                product= {pd} />)
                    
                }
             
        </div>
       <div className="curd-container">
           <Cart cart = {cart}></Cart>
       </div>
        </div>
    );
};

export default Shop;