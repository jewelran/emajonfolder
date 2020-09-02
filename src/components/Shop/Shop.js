import React from 'react';
import fakeData from '../../fakeData';
import { useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
const Shop = () => {
    const first10 = fakeData.slice(0, 20);
    const [product, setProduct] = useState(first10);
    const handleAddProduct = (product) =>{
        console.log('product add', product)
    }
    return (
        <div className="shot_container">
            <div className="product_container">
                {
                    product.map(pd => <Product handleAddProduct={handleAddProduct} product= {pd}></Product>)
                }
        </div>
       <div className="curd-container">
           <h2>total order count here</h2>
                <button>Oredr  Now</button>
       </div>
        </div>
    );
};

export default Shop;