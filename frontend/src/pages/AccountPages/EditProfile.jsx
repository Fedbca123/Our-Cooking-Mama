import React, { useState } from "react";

import NavBar from '../../components/NavBar-Components/NavBar';
import EditProfile from "../../components/Profile-Components/EditProfile";

export const ProfilePage = (props) => {

    return (
        <div>
            <NavBar />
            <div className="editProfPG">
                 <EditProfile />
            </div>
        </div>
    )
}

export default ProfilePage;