import React, { useState } from "react";

import NavBarLanding from '../../components/NavBar-Components/NavBarLanding';

import Logo from '../../components/Images/logoOrange.png';

export const LandingPage = (props) => {

    return (
        
        <div>
            <NavBarLanding />
            <div className="landing">
                <h1>Welcome Chef!</h1>

                <img src={Logo} className="landingLogo" alt="Logo: pixel bowl of soup" />

                <p>
                    Featuring your new social media and web platform for foodies galore! Post 
                    about your meals throughout the day and even gain access to their recipes 
                    - a centralized way to socialize and share about a beloved pasttime. Learn 
                    to cook and appreciate all types of food with "Our Cooking Mama."
                </p>
            </div>
        </div>
    )
}

export default LandingPage;