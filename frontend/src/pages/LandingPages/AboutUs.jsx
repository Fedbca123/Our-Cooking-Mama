import React, { useState } from "react";

import NavBarLanding from '../../components/NavBar-Components/NavBarLanding';
import Chef from './../../components/Images/chef.png';

export const AboutUs = (props) => {

    return (
        
        <div>
            <NavBarLanding />
            <div className="AboutUs">
                <h1 className="aboutTitles">About Us</h1>

                <div className="chefImages">
                    <img src={Chef} className="chef1" alt="pixelated person with chef coat and chef hat on." />
                    <img src={Chef} className="chef1" alt="pixelated person with chef coat and chef hat on." />
                    <img src={Chef} className="chef1" alt="pixelated person with chef coat and chef hat on." />
                </div>
                
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
                            <li>Chris Merino</li>
                            <li>Chrystian Orren</li>
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
                        COP 4331. Our goal was to create a platform for the foodies of the world to share photos of 
                        meals they made as well as giving the option to share the recipie for others to try, aiming 
                        to grow a foodie community with you and your mom.... or rather our mom.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutUs;