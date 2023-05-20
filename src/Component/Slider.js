import { useState } from "react";

export default function Slider() {
    const [sliderValue, setSliderValue] = useState(50);
    const handleSliderChange = (event) => {
        const value = event.target.value;
        setSliderValue(value);
        //updateData(value);
        console.log("Changed! " + value)
    };
    return (
        <input type="range" min="1" max="100" name="epoch" value={sliderValue} onChange={handleSliderChange} className="slider" />
    );
}