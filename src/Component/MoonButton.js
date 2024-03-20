import React from 'react';
const MoonButton = () => {

    const handleClick = () => {
        // Handle button click event
        console.log("clicked")
    };

    return (
        <button className="moon" value="moons" onClick={handleClick}>
            
        </button>
    );
};

export default MoonButton;
