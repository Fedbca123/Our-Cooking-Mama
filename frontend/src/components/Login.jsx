import React, { useState } from "react";

export const Login = (props) => {
    const [username, setUser] = useState('');
    const [pass, setPass] = useState('');

    const app_name = ''
    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'test') 
        {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {        
            return 'http://localhost:3000/' + route;
        }
    }

    const [message,setMessage] = useState('');

    const handleSubmit = async event => {

        event.preventDefault();

        var tmp = {UserName: username, Password: pass};
        var obj = JSON.stringify(tmp);

        try{

            const response = await fetch(buildPath('api/login'),
                {method:'FETCH',body:obj,headers:{'Content-Type': 'application/json'}});
             var result = JSON.parse(await response.text());

             if( result.id <= 0 ){

                setMessage('User/Password incorrect');

             } else {

                var user = {firstName: result.FirstName, lastName: result.LastName, id: result.id};
                localStorage.setItem('user_data', JSON.stringify(user));
                
                setMessage('');
                window.location.href = '/HomePage'
             }

        } catch(e) {
            alert(e.toString());
            return;
        }
        console.log(username);
    }

    return (
        <div className="auth-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input value = {username} type="text" placeholder="username" id="username" name="username" onChange={e => setUser(e.target.value)} />

                <label htmlFor="password">Password</label>
                <input type="password" value = {pass} placeholder="*******" id="password-retype" name="password-retype" onChange={e => setPass(e.target.value)}/>

                <button type="submit" onClick={handleSubmit}>Log In</button>
            </form>

            <span id="loginResult">{message}</span>

            <br></br>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>New Chef?</button>
        </div>
    )
}