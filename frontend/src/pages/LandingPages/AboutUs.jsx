import React, { useState } from "react";

import NavBarLanding from '../../components/NavBar-Components/NavBarLanding';

export const AboutUs = (props) => {

    return (
        
        <div>
            <NavBarLanding />
            <div className="AboutUs">
                <h1>About Us</h1>

                <div className="MeetTheTeam">
                    <h2>Meet Our Team</h2>
                    <ul>
                        <li><b>1 TBsp of Project Manager:</b></li>
                        <ul>
                            <li>Geela Ramos</li>
                        </ul>

                        <li><b>2 Cups of Front End:</b></li>
                        <ul>
                            <li>Rachel Biesiedzinski</li>
                            <li>Omar Shalaby</li>
                        </ul>
                        
                        <li><b>2 TPS of Back End:</b></li>
                        <ul>
                            <li>Marc Cross</li>
                            <li>Taniya Shaffer</li>
                        </ul>
                        
                        <li><b>1 Cup of Database:</b></li>
                        <ul>
                            <li>Iliya Klishin</li>
                        </ul>
                    </ul>
                </div>

                <div className="Motivation">
                    <h2>Motivation</h2>

                    <p>
                        For the trained chefs and the self-taught chefs to create and share what they are proud of!
                        The creation of Our Cooking Mama is a UCF based project, created as a large project for 
                        COP 4331. 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutUs;