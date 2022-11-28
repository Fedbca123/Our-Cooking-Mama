import React, { useState } from "react";

import NavBar from '../../components/NavBar-Components/NavBar';
import ProfileSum from "../../components/Profile-Components/ProfileSum";
import ProfilePosts from "../../components/Profile-Components/ProfilePosts"

export const ProfilePage = (props) => {

    return (
        <div>
            <NavBar />
            <div className="profilePG">
                 <ProfileSum />
                 <ProfilePosts/>
            </div>
        </div>
    )
}

export default ProfilePage;