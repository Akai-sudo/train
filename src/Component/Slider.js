import React, { useState, useCallback } from "react";



const Slider = React.memo(({ onSliderValueChange }) => {
    const [sliderValue, setSliderValue] = useState(0);

    // const handleSliderChange = (event) => {
    //     const value = event.target.value;
    //     setSliderValue(value);
    //     onSliderValueChange(value);
    // };
    const epoch = Number(sliderValue) + 1;

    const handleSliderChange = useCallback((event) => {
        const value = event.target.value;
        setSliderValue(value);
        onSliderValueChange(value);
    }, [onSliderValueChange]);

    return (
        <div className="sliderDiv">
            <span>Epoch: {epoch}</span>
            <input
                type="range"
                min="0" max="99"
                name="epoch"
                value={sliderValue}
                onChange={handleSliderChange}
                className="slider" />
        </div>
    );
});

export default Slider;