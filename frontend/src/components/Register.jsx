import React, { useState } from "react";

export const Register = (props) => 
{
    const [first_name, setFirst] = useState('');
    const [last_name, setLast] = useState('');
    const [username, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email);
    }

    return(
        <div className="auth-form-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="first_name">First Name</label>
                <input type="text" name="first_name" id="first_name" placeHolder="First Name" />

                <label htmlFor="last_name">Last Name</label>
                <input type="text" name="last_name" id="lsat_name" placeHolder="Last Name" />
            
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Email Adress" id="email" name="email" />

                <label htmlFor="username">Username</label>
                <input type="text" placeholder="user1234" id="username" name="username" />

                <label htmlFor="password">Password</label>
                <input type="password" placeholder="*******" id="password" name="password" />

                <button type="submit">Register</button>
            </form>

            <br></br>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Existing Chef?</button>
        </div>
    )
    
}