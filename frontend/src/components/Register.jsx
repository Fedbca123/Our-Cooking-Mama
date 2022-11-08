import React, { useState } from "react";

export const Register = (props) => 
{
    const [first_name, setFirst] = useState('');
    const [last_name, setLast] = useState('');
    const [username, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [reType, setReType] = useState();

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log(email);
        
    // }

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
                {method:'POST',body:obj,headers:{'Content-Type': 'application/json'}});
             var result = JSON.parse(await response.text());

             if( result.id <= 0 ){

                setMessage('User/Password incorrect');

             } else {

                var user = {firstName: result.FirstName, lastName: result.LastName, id: result.id};
                localStorage.setItem('user_data', JSON.stringify(user));
                
                setMessage('');
                window.location.href = '/Login'
             }

        } catch(e) {
            alert(e.toString());
            return;
        }
        console.log(username);
    }

    return(
        <div className="auth-form-container">
            <form className="register-form" onSubmit={handleSubmit}>
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
                <input type="password" value={reType} placeholder="*******" id="password" name="password" onChange={e => setReType(e.target.value)}/>

                <button type="submit">Register</button>
            </form>
                <span id="registerResult">{message}</span>
            <br></br>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Existing Chef?</button>
        </div>
    )
    
}