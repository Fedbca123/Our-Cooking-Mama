import React, { useState } from "react";
import { useLocation } from 'react-router-dom'

import NavBar from '../../components/NavBar-Components/NavBar';
import SearchProfileSum from "../../components/Profile-Components/SearchProfileSum";

export const SearchProfilePage = (props) => {
    const location = useLocation()
    const { id } = location.state 

    return (
        <div>
            <NavBar />
            <div className="profilePG">
                 <SearchProfileSum props={id} />
            </div>
        </div>
    )
}

export default SearchProfilePage;