import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { buildPath } from "../../components/bPath";
import NavBarLanding from "../../components/NavBar-Components/NavBarLanding";


export const ResetPass = (props) => {

    const[pass, SetPass] = useState("");
    const[retype, SetRetype] = useState("");
    const[message, SetMessage] = useState("");
    const navigate = useNavigate();

    
    async function changePass() {

        if(pass.target.value.length < 8){
            SetMessage("Password Must be 8 characters long.");
            return;
        } else if(pass.target.value !== retype.target.value){
            SetMessage("Passwords Must Match.");
            return;
        } else {

            try{
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                console.log(urlParams.get('UserID'));
                const response = await fetch(buildPath("api/changePassword"), {
                    method: "POST",
                    body: JSON.stringify({UserID: urlParams.get('UserID'), Password: pass.target.value, ConfirmedPassword: retype.target.value}),
                    headers:{
                        "Content-Type": "application/json",
                        "Accept": "application/json",    
                    }

                });

                var res = JSON.parse(await response.text());

                if(res.status == 400){
                    SetMessage("User not found.");
                    return;
                } else {
                    SetMessage(" ");
                    navigate("/login");
                }
            } catch(e){
                alert(e.message);
            } 
        }

    }

    return (
        <div>
            <NavBarLanding />
            <h2>Reset Password</h2>
            <br />
            <h3>Enter New Password</h3>
            <br />
            <input type="password" placeholder="********" onChange={(val) => SetPass(val)}/>
            <br />
            <h3> Re Enter New Password</h3>
            <br />
            <input type="password" placeholder="********" onChange={(val) => SetRetype(val)}/>
            <br />
            <button type="submit" onClick={changePass}>Change</button>
            <br />
            <span id="ResetResult">{message}</span>
        </div>
    )
}

export default ResetPass;