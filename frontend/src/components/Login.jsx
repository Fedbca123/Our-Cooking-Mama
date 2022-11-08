import React, { useState } from "react";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="youremail@gmail.com" id="email" name="email" />

                <label htmlFor="password">Password</label>
                <input type="password" placeholder="*******" id="password" name="password" />

                <button type="submit">Log In</button>
            </form>

            <br></br>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>New Chef?</button>
        </div>
    )
}