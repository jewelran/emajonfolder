import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee ,faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import logo from '../../images/logo.png'
import './Header.css'
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <div className = 'header'>
           <img src={logo} alt=""/>
           <nav >
               <Link className="list" to="shop">Shop</Link>
               <Link className="list" to="Review">Over Review</Link>
               <Link  className="list" to="Inventory">invantory</Link> <br/>
               <br/> <input type="text" placeholder= "Search here"/>
               <button className='searchBtn'>surch here</button>
                  <span style={{marginLeft:"30px"}}><FontAwesomeIcon style={{color:'white'}} icon={faShoppingCart} /> <small style={{color:"white",fontSize:"20px",marginLeft:"15px"}}>0</small></span>
           </nav>
        </div>
    );
};

export default Header;