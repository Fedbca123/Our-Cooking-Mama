import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { buildPath } from "../../components/bPath";
import NavBarLanding from "../../components/NavBar-Components/NavBarLanding";

export const SendEmail = (props) => {
    
    const[email, setEmail] = useState("");

    const navigate = useNavigate();

    const [message, setMessage] = useState("");

    let bp = require("./../../components/bPath.js");

    async function sendEmail(){

        if(email.target.value === ""){
            setMessage("Please Enter an Email.");
            return;
        } else {

            try{

                const response = await fetch(bp.buildPath("api/sendResetEmail"), {
                    method: "POST",
                    body: JSON.stringify({Email: email.target.value}),
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    }
                });

                var res = JSON.parse(await response.text());

                if(res.error === "A user with that email could not be found."){
                    setMessage("Email Not Found in Database");
                    return;
                } else {
                    setMessage("Email Sent!");
                }

            } catch (e){
                alert(e.toString());
            }

        }
    }

    return (
        <><NavBarLanding/>
            <h2>Reset Your Password</h2>
            <br />
            <h3>Enter Your Email</h3>
            <input type="email" placeholder="Forgot@mail.com" id="ResetPassword" onChange={(val) => setEmail(val)}/>
            <br />
            <button type="submit"  onClick={sendEmail}>Send Email</button>
            <br/>
            <Link to="/login">Back to Login</Link>
            <br />
            <span id="Email Result">{message}</span>
        </>
        

    )
}

export default SendEmail;