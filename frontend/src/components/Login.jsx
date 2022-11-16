import React, { useState } from "react";
import { useHistory, useNavigate } from 'react-router-dom';

import NavBarLanding from '../components/NavBar-Components/NavBarLanding';

export const Login = (props) => {

    const navigate = useNavigate();

    const [username, setUser] = useState('');
    const [pass, setPass] = useState('');

    const app_name = 'your-cooking-mom-test'
    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'test') {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {        
            return 'http://localhost:3000/' + route;
        }
    }

    const [message,setMessage] = useState('');

    

    async function login(event){
        
        event.preventDefault();

        try{

            if(username === "" || pass === "") {
                setMessage("Please Fill in both fields.");
                return;
            } else { //added else statement so user can't login if they don't fill in both fields.
                let result = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json',
                        'Accept':'application/json'
                    },
                    body:JSON.stringify({
                        UserName: username,
                        Password: pass
                    })
                });
                result = await result.json();

                console.log(result.error);
                setMessage(result.error);
                
                // Need to change it here so if the login infor is wrong then they cant get in.. right now it just lets them in.
                window.location.href = "/homepage";
            }
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div>
            <NavBarLanding className="landingNav"/>

            <div className="auth-form-container">
                <label htmlFor="username">Username</label>
                <input type="text" value={username} placeholder="user1234" id="username" name="username" onChange={e => setUser(e.target.value)}/>

                <label htmlFor="password">Password</label>
                <input type="password" value={pass} placeholder="*******" id="password" name="password" onChange={e => setPass(e.target.value)}/>

                <button type="submit" onClick={login}>Log In</button>
                <span id="loginResult">{message}</span>

                <br></br>
                <button className="link-btn" onClick={() => navigate('/register')}>New Chef?</button>
            </div>
        </div>
    )
}

export default Login;