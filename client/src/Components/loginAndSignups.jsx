import { useState } from "react";
import React from "react";

const loginAndSignups = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    cosnt [email, setEmail] = useState('');
    const [forms,setForms] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const handleLogin = () => {
        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password})
            });
            if(response.ok){
                setIsLoggedIn(true);
                setForms(false);
            }
        }catch(e){
            console.error('Error logging in');
        }

    }

    const handleSignup = async () => {
        try{
            const response = await fetch('http://localhost:8000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password, email})
            });
            if(response.ok){
                setIsLoggedIn(true);
                setForms(false);
            }
        }catch(e){
            console.error('Error signing up');
        }   
    }

    return (
        <>
        { (forms) ?{
            <div>
                <h1>Login and Signups</h1>
                <form>
                    <input type="text" placeholder="Username" onChange={(e)=>setUsername(e.traget.value)/>
                    <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.traget.value)} />
                    <button type="submit" onClick={handleLogin}>Login</button>
                    <p>Create a new account</p><button type="button" onClick={setForms(false)}>Signup</button>
                </form>
            </div>
        }: {
            <div>
            <h1>Login and Signups</h1>
            <form>
                <input type="text" placeholder="Username" onChange={(e)=>setUsername(e.traget.value) />
                <input type="password" placeholder="Password"  onChange={(e)=>setPassword(e.traget.value)/>
                <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.traget.value)/>
                <button type="submit" onClick={handleSignup}>Sign Up</button>
                <p>already have an account?</p><button onClick={setForms(true)} type="button">login</button>
            </form>
        </div>
    }
}</>)
}

export default loginAndSignups;