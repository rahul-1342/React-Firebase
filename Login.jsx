import React, { useEffect, useState } from 'react'
import {auth} from '../firebase-config';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';


export default function Login() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [user,setUser]=useState(null);

  const logIn=(e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential) =>{
      const loggedInUser=userCredential.user;
      setUser(loggedInUser);
    }).catch((error)=>{
      console.log(error)
    })
  };

  const logOut =()=>{
    signOut(auth)
    .then(()=> {
      setUser(null);
      console.log("sign out")
    }).catch((error)=>{
      console.log(error)
    })
  }

  useEffect(()=>{
    const unsubscrible =auth.onAuthStateChanged((user)=>{
      if(user){
        setUser(user);
      }
      else{
        setUser(null);
      }
    });
    return ()=>unsubscrible();
  },[])
  return (
    <div>
      <form onSubmit={logIn}>
        <h1>Log In</h1>
        <input type='email' placeholder='Enter Your Email'  value={email} onChange={(e) =>setEmail(e.target.value)}></input>
        <input type='password' placeholder='Enter Your Password' value={password} onChange={(e) =>setPassword(e.target.value)}></input>
        <button type='submit'>Login</button>
      </form>
      {user? (
        <div>
            <p>Welcome,{user.email}</p>
            <button onClick={logOut}>Log Out</button> 
            </div>
      ):(
        <p>You Are Not Logged In</p>
      )}
     
    </div>
  )
}

