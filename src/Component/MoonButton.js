import React from 'react';
const MoonButton = () => {

    const handleClick = () => {
        // Handle button click event
        console.log("clicked")
    };

    return (
        <button className="moon" value="moons" onClick={handleClick}>
            {/* You can add any content inside the button */}
        </button>
    );
};

export default MoonButton;
