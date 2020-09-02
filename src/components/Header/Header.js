import React from 'react';
import logo from '../../images/logo.png'
import './Header.css'
const Header = () => {
    return (
        <div className = 'header'>
           <img src={logo} alt=""/>
           <nav >
               <a href="shop">Shop</a>
               <a href="Review">Over Review</a>
               <a href="manage">Manage invantory Here</a> <br/>
               <br/> <input type="text" placeholder= "Search here"/>
               <button className='searchBtn'>surch here</button>
           </nav>
        </div>
    );
};

export default Header;