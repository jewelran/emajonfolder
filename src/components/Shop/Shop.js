import React, { useEffect } from 'react';
import fakeData from '../../fakeData';
import { useState } from 'react';
import './Shop.css'
import { Link } from 'react-router-dom';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
const Shop = () => {
    const first10 = fakeData.slice(0, 20);
    const [cart, setCart] = useState([]);

    useEffect( () => {
        const saveCart = getDatabaseCart();
        const productKey = Object.keys(saveCart);
        const previousCart = productKey.map( pdKey => {
            const product = fakeData.find( pd => pd.key === pdKey);
            product.quantity = saveCart[pdKey];
            return product;
        })
        setCart(previousCart)
    },[])

    // useEffect( () =>{
    //     const saveCart = getDatabaseCart()
    //     const productKey = Object.keys(saveCart);
    //     const previousCart = productKey.map( existingKey => {
    //         const product = fakeData.find( pd => pd.key === existingKey);
    //         product.quantity = saveCart[existingKey];
    //         return product;
            
    //     })
    //     // console.log(productKey)
    //     setCart(previousCart)
    // },[])
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
                    product.map( pd => <Product key = {pd.key} showAddToCard ={true}  handleAddProduct={handleAddProduct} product= {pd} />)
                    
                }
             
        </div>
       <div className="curd-container">
           <Cart cart = {cart}>
           <Link to='/Review'>
                <button className= "orderBtn">Oredr Review</button>
            </Link>
           </Cart>
       </div>
        </div>
    );
};

export default Shop;