import React,{useState} from 'react'
import { auth } from './firebase';
import "./Login.css";
import {useDispatch} from "react-redux";
import {login} from "./features/userSlice";

function Login() {
        const[email,setEmail]=useState("");
        const [password,setPassword]=useState("");
        const[name,setName]=useState("");
        const [profilePic,setProfilePic]=useState("");
        const  dispatch = useDispatch()

    const loginToApp=(e)=>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
        .then(userAuth=>{
            if(!userAuth){
                // alert("Please enter the correct username and password")
            }
            dispatch(login({
                email: userAuth.user.email, 
                uid:userAuth.user.uid,
                displayName:userAuth.user.displayName,
                photoURL:userAuth.user.photoURL,
            }))
        })
        .catch(err=>alert(err));
        
    };

    const register =()=>{
        if(!name){
            alert("Please enter a full name");
        }
        else{
        auth.createUserWithEmailAndPassword(email,password)
        .then((userAuth)=>{
            userAuth.user.updateProfile({
                displayName:name,
                photoURL:profilePic,
            })
            .then(()=>{
                dispatch(login({
                  email: userAuth.user.email, 
                  uid:userAuth.user.uid,
                  displayName:name,
                  photoURL:profilePic,
                }))
            })
        })
        .catch((err)=>alert(err))
        }
    };

    return (
        <div className="login">
            <img src="https://cdn.worldvectorlogo.com/logos/linkedin.svg"
             alt=""/>

             <form action="">
                 <input type="text" placeholder="Full name (required if registering)" value={name} onChange={(event)=>setName(event.target.value)}/>
                 <input type="text" placeholder="Profile pic URL (optional)" value={profilePic} onChange={e=>setProfilePic(e.target.value)}/>
                 <input type="email" placeholder="Email" value={email} onChange={(event)=>setEmail(event.target.value)}/>
                 <input type="password" placeholder="Password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
                 <button type="submit" onClick={loginToApp}>Sign In</button>
             </form>
            <p>Not a member?{" "}
                <span className="login__register" onClick={register}>Register Now</span>
            </p> 
        </div>
    )
}

export default Login
