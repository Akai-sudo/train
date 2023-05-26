import React, { useState, useCallback } from "react";

const Slider = React.memo(({ onSliderValueChange }) => {
    const [sliderValue, setSliderValue] = useState(50);

    // const handleSliderChange = (event) => {
    //     const value = event.target.value;
    //     setSliderValue(value);
    //     onSliderValueChange(value);
    // };
    const handleSliderChange = useCallback((event) => {
        const value = event.target.value;
        setSliderValue(value);
        onSliderValueChange(value);
    }, [onSliderValueChange]);

    return (
        <input
            type="range"
            min="0" max="99"
            name="epoch"
            value={sliderValue}
            onChange={handleSliderChange}
            className="slider" />
    );
});

export default Slider;