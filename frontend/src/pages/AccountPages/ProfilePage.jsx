import React, { useState } from "react";

import NavBar from '../../components/NavBar-Components/NavBar';
import ProfileSum from "../../components/Profile-Components/ProfileSum";

export const ProfilePage = (props) => {

    return (
        <div>
            <NavBar />
            <div className="profilePG">
                 <ProfileSum />
            </div>
        </div>
    )
}

export default ProfilePage;