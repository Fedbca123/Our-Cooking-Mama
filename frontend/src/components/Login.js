import React, { useState } from "react";

import NavBarLanding from "./NavBar-Components/NavBarLanding";

function Login ()
{
    var loginName;
    var loginPassword;

    const [message, setMessage] = useState('');


    const doLogin = async event =>
    {
        event.preventDefault();

        var obj = {UserName: loginName.value, Password: loginPassword.value};
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch ('http://localhost:3000/api/login',
                {
                    method: 'POST',
                    body: js,
                    headers: { 'Content-Type': 'application/json/' }
                }
            );

            var res = JSON.parse(await response.text());

            if( res.id <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user = {FirstName: res.firstName, LastName: res.lastName, _id: res.id}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage(' ');
                window.location.href = '/homepage';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    return (
        <div>
            <NavBarLanding />
            <div id="loginDiv">
                <form onSubmit={doLogin}>
                    <span id="inner-title">Please Login In</span><br />
                
                    <input type="text" id="loginName" placeholder="Username" ref={ (c) => loginName = c } /> <br />

                    <input type="password" id="loginPassword" placeholder="********" ref={ (c) => loginPassword = c } /> <br />

                    <input type="submit" id="loginButton" class="buttons" value="Do It" onClick={doLogin} />

                </form>
                <span id="loginResult">{message}</span>
            </div>
        </div>
    );
};

export default Login;