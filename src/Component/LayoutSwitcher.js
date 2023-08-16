import { useEffect, useState } from "react";
import Loading from "./Loading";
import Heatmap from "./Heatmap";
import Chart from "./Chart";
import Space from "./Space";
import Signal from "./Signal";

import loss from "../loss.svg"
import heatmap from "../heatmap.svg"
import wave from "../wave.svg"
import stars from "../stars.svg"

import React from 'react';


import { useSpring, animated } from '@react-spring/web';
import Slider from "./Slider";


const LayoutSwitcher = (props) => {
    //const lossyarray = props;
    //console.log(data)
    //const weights = props ? props.weights : 0
    //const prevSeriesRef = useRef(props.series);

    // const layer_number = props.layers
    // const neuron_number = props.neurons
    // const weights = props.weights

    const [sliderValue, setsliderValue] = useState(0);

    const handleSliderValueChange = (value) => {
        setsliderValue(value);
    };

    const opacityProps = useSpring({
        config: { duration: 1200 },
        textShadow: `0 25px 50px -12px #000;`,
        from: { opacity: 0, y: -10 },
        to: { opacity: 1, y: 0 }
    });

    const [selectedLayout, setSelectedLayout] = useState('Loss curve');
    const handleLayoutChange = (layout) => {
        setSelectedLayout(layout);
    };

    const hideSlider = {
        visibility: "hidden",
    };

    const renderLayout = () => {
        if (selectedLayout === 'Loss curve') {
            return (props.neurons ? <Chart slider={sliderValue} data={props.lossyarray} /> : <Loading />);
        } else if (selectedLayout === 'Heatmap') {
            return (props.neurons ? <Heatmap slider={sliderValue} neurons={props.neurons} weights={props.weights} layers={props.layers} /> : <Loading />);
        } else if (selectedLayout === 'Space') {
            return (props.neurons ? <Space slider={sliderValue} neurons={props.neurons} weights={props.allweights} layers={props.layers} /> : <Loading />);
        } else if (selectedLayout === 'Signal') {
            return (

                props.neurons ? <Signal slider={sliderValue} activations={props.activations} /> : <Loading />

            );
        }
        return null;
    };

    return (
        <animated.div
            style={{
                ...opacityProps,
            }}
        >
            <div className="switcher">
                <div className="boxGroup">
                    <div className="box" onClick={() => handleLayoutChange("Loss curve")}><img src={loss} alt="loss" />Loss</div>
                    <div className="box" onClick={() => handleLayoutChange("Heatmap")}><img src={heatmap} alt="heatmap" />Heatmap</div>
                    <div className="box" onClick={() => handleLayoutChange("Space")}><img src={stars} alt="stars" />Space</div>
                    <div className="box" onClick={() => handleLayoutChange("Signal")}><img src={wave} alt="wave" />Signal</div>
                </div>

                <div className="layout-container">
                    {/* <animated.div
                    style={{
                        ...opacityProps,
                    }}
                > */}

                    <div>{selectedLayout === "Space" ? null : selectedLayout}</div>
                    {renderLayout()}

                    {selectedLayout === "Loss curve"
                        ?
                        <div style={hideSlider}>
                            <Slider onSliderValueChange={handleSliderValueChange} />
                        </div> :
                        <Slider onSliderValueChange={handleSliderValueChange} />
                    }
                    {/* </animated.div> */}
                </div>
            </div>
        </animated.div>
    );
}

export default LayoutSwitcher;
