import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './Review/Review';
import Inventory from './Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
export const UserContext = createContext()
function App() {
const [loggedInUser,setLoggedInUser] = useState({})
  return (
    // for user context..............
    <UserContext.Provider value= {[loggedInUser,  setLoggedInUser]}>
      <h3>Email: {loggedInUser.email}</h3>
      <h3>Name:{loggedInUser.name}</h3>
      {/* for usercontext------------------ */}
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/Review"> 
            <Review></Review>
          </Route>
          <Route path="/login"> 
            <Login></Login>
          </Route>
          <PrivateRoute path="/shipment"> 
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/Inventory">
            <Inventory></Inventory>
          </Route>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
