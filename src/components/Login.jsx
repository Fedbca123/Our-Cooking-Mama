import React, { useState } from "react";
import { useHistory, useNavigate } from 'react-router-dom';

export const Login = (props) => {

    const navigate = useNavigate();

    const [username, setUser] = useState('');
    const [pass, setPass] = useState('');

    const app_name = 'your-cooking-mom-test'
    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'production') {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {        
            return 'http://localhost:3000/' + route;
        }
    }

    const [message,setMessage] = useState('');

    const handleSubmit = async event => {

       //event.preventDefault();

        //var tmp = {UserName: username, Password: pass};
        //var obj = JSON.stringify(tmp);

        //try{

            //const response = await fetch(buildPath('api/login'),
                //{
                   // method:'FETCH',
                   // body:obj,
                   // headers:{'Content-Type': 'application/json'},
                //});
             //var result = JSON.parse(await response.text());

             //if( result.id <= 0 ){

                //setMessage('User/Password incorrect');

             //} else {

                //var user = {firstName: result.FirstName, lastName: result.LastName, id: result.id};
                //localStorage.setItem('user_data', JSON.stringify(user));
                
               // setMessage('');
               // window.location.href = '/HomePage'
            // }

        //} catch(e) {
        //    alert(e.toString());
         //   return;
        //}
       // console.log(username);
    }

    async function login(event){
        
        event.preventDefault();

        try{

            if(username === "" || pass === "") {
                setMessage("Please Fill in both fields.");
                return;
            }
            let result = await fetch('http://your-cooking-mom-test.herokuapp.com/api/login', {
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

            window.location.href = "/homepage";
        } catch(error) {
            console.log(error);
        }
    }

    return (
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
    )
}

export default Login;