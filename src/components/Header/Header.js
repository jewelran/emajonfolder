import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee ,faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import logo from '../../images/logo.png'
import './Header.css'
const Header = () => {
    return (
        <div className = 'header'>
           <img src={logo} alt=""/>
           <nav >
               <a className="list" href="shop">Shop</a>
               <a className="list" href="Review">Over Review</a>
               <a className="list" href="Inventory">invantory</a> <br/>
               <br/> <input type="text" placeholder= "Search here"/>
               <button className='searchBtn'>surch here</button>
                  <span style={{marginLeft:"30px"}}><FontAwesomeIcon style={{color:'white'}} icon={faShoppingCart} /> <small style={{color:"white",fontSize:"20px",marginLeft:"15px"}}>0</small></span>
           </nav>
        </div>
    );
};

export default Header;