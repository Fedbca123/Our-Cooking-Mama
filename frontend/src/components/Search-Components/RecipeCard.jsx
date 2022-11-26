import React, { useState } from "react";

export default function Card(props) {

    return (
        <div className="card">
            {/*Recipe Information */}
            <div className="card-header">
                <h2 className="card-title">Our Mom's Favorite Meal</h2>
                <div className="card-profile">

                </div>
            </div>
            <img className="card-image" src={""} alt="food" />
            <div className="card-body">
                <p className="card-description">This is a test of the card component, 
                which will actually pull from the DB a related post's caption if 
                properly linked.</p>
            </div>

            {/*Recipe Card Buttons*/}
            <div className="card-viewrecipe">
                <button className="viewrecipe-button">View Recipe...</button>
            </div>
            <div className="card-likerecipe">
                <button className="likerecipe-button">Like Recipe!</button>
            </div>
    </div>
    )
}


