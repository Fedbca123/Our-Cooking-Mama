import React, { useState } from "react";
import { useHistory, useNavigate } from 'react-router-dom';

import NavBarLanding from '../components/NavBar-Components/NavBarLanding';

export const Register = (props) => 
{
    const navigate = useNavigate();

    const [first_name, setFirst] = useState('');
    const [last_name, setLast] = useState('');
    const [username, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const [reType, setReType] = useState();
    const [message,setMessage] = useState('');

    const handleSubmit = async (e) => {
        // console.log("wee hoo");
        // e.preventDefault();
        // try {
        //     const response = await fetch('http://172.25.208.1:3000/api/register', {
        //         method: 'post',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type':'application/json'
        //         },
        //         body: JSON.stringify({
        //             FirstName: "holy fuck",
        //             LastName: "last name",
        //             UserName: "webapp freaking works!",
        //             Email: "email",
        //             Password: "cats"
        //         })
        //     });
        //     const data = await response.json();
		// 	console.log(data._id);
        // } catch (e) {
        //     console.log(e);
        // }

    }

    // I removed the form submit function as a sanity check sorry! I added this to the 'register' button
    async function register(event){ 
        event.preventDefault();

        try{
            if(reType !== pass){
                setMessage("Passwords Do Not Match.");
                return;
            }

            if(first_name === ""|| last_name === "" || email === ""|| pass === "" || reType === "" || username === ""){
                setMessage("Please fill in all fields.");
            }
            let result = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
                body:JSON.stringify({
                    FirstName: first_name,
                    LastName: last_name,
                    UserName: username,
                    Email: email,
                    Password: pass
                })
            });
            result = await result.json();

            setMessage("Account Registered! Returning to Login.");

            window.location.href = "/login";
        }catch (error){
            console.log(error);
        }
    }

    return(
        <div>
                <NavBarLanding className="landingNav"/>
                
            <div className="auth-form-container">
                <label htmlFor="first_name">First Name</label>
                <input type="text" value={first_name} name="first_name" id="first_name" placeHolder="First Name" onChange={e => setFirst(e.target.value)}/>

                <label htmlFor="last_name">Last Name</label>
                <input type="text" value={last_name} name="last_name" id="lsat_name" placeHolder="Last Name" onChange={e => setLast(e.target.value)}/>
            
                <label htmlFor="email">Email</label>
                <input type="email" value={email} placeholder="Email Adress" id="email" name="email" onChange={e => setEmail(e.target.value)}/>

                <label htmlFor="username">Username</label>
                <input type="text" value={username} placeholder="user1234" id="username" name="username" onChange={e => setUser(e.target.value)}/>

                <label htmlFor="password">Password</label>
                <input type="password" value={pass} placeholder="*******" id="password" name="password" onChange={e => setPass(e.target.value)}/>

                <label htmlFor="re-type">Re-Type Password</label>
                <input type="password" value={reType} placeholder="*******" id="password-retype" name="password-retype" onChange={e => setReType(e.target.value)}/>

                <button type="submit" onClick={register}>Register</button>
                <span id="registerResult">{message}</span>
                <br></br>
                <button className="link-btn" onClick={() => navigate('/login')}>Existing Chef?</button>
            </div>
        </div>
    )
    
}

export default Register;