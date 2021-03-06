import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { useState } from 'react';
import firebaseConfig from '../firebaseConfig';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
firebase.initializeApp(firebaseConfig)
const Login = () => {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
      isSignIn: false,
      newUser: false,
      name: '',
      email: '',
      password: '',
      photo: '',
      error: '',
      success: false,
    });
    // for user context....
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)
    // handle sing in..........
    const history= useHistory()
    const location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } };
 
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleSingIn = () => {
      firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
          const { displayName, photoURL, email } = res.user
          const signInUser = {
            isSignIn: true,
            name: displayName,
            email: email,
            photo: photoURL
  
          }
          setUser(signInUser)

          // console.log(displayName,photoURL, email)
        })
        .catch(error => {
          console.log(error)
          console.log(error.message);
        })
    }
    // for handle sign out
    const handleSingOut = () => {
      firebase.auth().signOut()
        .then(res => {
          const singOutUser = {
            isSignIn: false,
            name: '',
            email: '',
            photo: ''
          }
          setUser(singOutUser)
        })
        .catch(error => {
          console.log(error)
          console.log(error.message)
  
        })
      // console.log('sing OUt')
    }
    // const handleSubmit = (e) =>{
    const handleSubmit = (e) => {
      // console.log(user.email, user.password)
  
      if (user.email && user.password) {
        // console.log('submited')
        //create new user...............
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then(res => {
            const newUserInfo = { ...user };
            newUserInfo.error = '';
            newUserInfo.success = true; //for show success message
            setUser(newUserInfo)
            // console.log(res)
            updateUserName(user.name)
          })
          // end of create new user
  
          .catch(error => {
            // Handle Errors here.
            const newUserInfo = { ...user } //error message show korar jonn.
            newUserInfo.error = error.message;
            newUserInfo.success = false; //for hidden success message
            // var errorMessage = error.message;
            // console.log(errorCode, errorMessage)
            setUser(newUserInfo)
            // ...
          });
        
      }
      e.preventDefault()
      // e.preventDefault() ...reload na korar jonno use korte hobe
      if (!newUser && user.email && user.password) {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
          .then(res => {
            const newUserInfo = { ...user };
            newUserInfo.error = '';
            newUserInfo.success = true; //for show success message
            setUser(newUserInfo)
            //user context api....
            setLoggedInUser(newUserInfo)
            //history atontication
            history.replace(from);
            console.log(res.user)
          })
          .catch(error => {
            // Handle Errors here.
            const newUserInfo = { ...user } //error message show korar jonn.
            newUserInfo.error = error.message;
            newUserInfo.success = false; //for hidden success message
            // console.log(errorCode, errorMessage)
            setUser(newUserInfo)
          });
          

      }
    }
    // handler blure for.. fild valid ..??
    const handleonBlur = (e) => {
      // console.log(e.target.name,e.target.value)
      let isFildValid = true;
      if (e.target.name === 'email') {
        isFildValid = /\S+@\S+\.\S+/.test(e.target.value)
      }
      if (e.target.name === 'password ') {
        const isPasswordValue = e.target.value.length > 6;
        const passwordHasValid = /\d{1}/.test(e.target.value)
        isFildValid = isPasswordValue && passwordHasValid
      }
      if (isFildValid) {
        const newUserInfo = { ...user };
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
      }
  
    }
    // login width email and password.........
  
    const updateUserName = name =>{
      var user = firebase.auth().currentUser;
      //update user name...........
  user.updateProfile({
    displayName: name,
  }).then(function() {
    // Update successful.
    console.log('user update seccessfully',user)
  }).catch(error =>{
    console.log(error)
  });
    }
    // facebook sing in ........................
    const handleFbSingIn = () => {
      firebase.auth().signInWithPopup(fbProvider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user)
        const { displayName, photoURL, email } = result.user
        const signInUser = {
          isSignIn: true,
          name: displayName,
          email: email || displayName,
          photo: photoURL

        }
        setUser(signInUser)
        setLoggedInUser(signInUser)
        
        // .....
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        console.log(error)
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }
    return (
        <div className="App" style={{backgroundColor:'#e0e0e0',padding:'50px'}}>
        <h1>Our won authentication</h1>
        <h3 style={{ color: 'orange' }}>Sign Up</h3>

        {
          user.isSignIn ? <button onClick={handleSingOut} >Sing out</button> :
            <button style={{padding:'8px 10px' , cursor:'pointer'}} onClick={handleSingIn} >Log in width google</button>
        }
        <br/>
        <br/>
        <button onClick={handleFbSingIn} style={{padding:'8px 10px' , cursor:'pointer'}}>Login width facebook</button>
  
        {
          user.isSignIn && <div className="">
            <h2>Welcome, {user.name}</h2>
            <p>Email: {user.email}</p>
            <img style={{ borderRadius: "50%" }} src={user.photo} alt="" />
  
  
          </div>
        }
        <br/>
        <br/>
        <input style={{cursor:'pointer'}} type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
         <label htmlFor="newUser">sing Up</label>
  
  
        {/* <h2>Name:{user.name}</h2>
          <h3>Email:{user.email}</h3>
          <h3>Password:{user.password}</h3> */}
  
        <form onSubmit={handleSubmit}>
  
          {newUser && <input style={{padding:'8px 10px' , cursor:'pointer',borderRadius:'8px'}} name="name" type="text" onBlur={handleonBlur} placeholder="Your name" required />}
          <br />
          <br />
          <input style={{padding:'8px 10px' ,borderRadius:'8px', cursor:'pointer'}} type="text" name="email" onBlur={handleonBlur} placeholder='Your Email' required />
          <br />
          <br />
          <input style={{padding:'8px 10px' ,borderRadius:'8px', cursor:'pointer'}} type="password" name="password" onBlur={handleonBlur} placeholder="Your password" required />
          <br />
          <br />
          <input style={{  cursor: 'pointer', borderRadius: '8px', backgroundColor: 'orange', padding: '10px 20px', border: 'none' }} type="submit" value="submit" />
          <p style={{ color: 'red' }}>{user.error}</p>
          {user.success && <p style={{ color: 'green' }}>user {newUser?'created': 'logged in'} successfully</p>}
        </form>
      </div>
  
    );
};

export default Login;
