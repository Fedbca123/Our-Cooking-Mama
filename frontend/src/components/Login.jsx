import React, { useState } from "react";

export const Login = (props) => {
    const [username, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username);
    }

    return (
        <div className="auth-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input value = {username} type="text" placeholder="username" id="username" name="username" />

                <label htmlFor="password">Password</label>
                <input type="password" value = {pass} placeholder="*******" id="password" name="password" />

                <button type="submit">Log In</button>
            </form>

            <br></br>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>New Chef?</button>
        </div>
    )
}