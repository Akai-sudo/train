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

import React, { memo } from 'react';


import { useSpring, animated } from '@react-spring/web';

// const LossChart = memo(({ lossyarray }) => {
//     return (
//         <Chart data={lossyarray} />
//     );
// });

// const HeatmapChart = memo(({ slider, neurons, weights, layers }) => {
//     return (
//         <Heatmap slider={slider} neurons={neurons} weights={weights} layers={layers} />
//     );
// });


const LayoutSwitcher = (props) => {
    //const lossyarray = props;
    //console.log(data)
    //const weights = props ? props.weights : 0
    //const prevSeriesRef = useRef(props.series);

    // const layer_number = props.layers
    // const neuron_number = props.neurons
    // const weights = props.weights
    const amplitude = 5; // Change this value as desired
    const frequency = 5;

    const opacityProps = useSpring({
        config: { duration: 1200 },
        textShadow: `0 25px 50px -12px #000;`,
        from: { opacity: 0, y: -10 },
        to: { opacity: 1, y: 0 }
    });

    const [selectedLayout, setSelectedLayout] = useState('Loss curve');
    const handleLayoutChange = (layout) => {
        //console.log("changed!")
        setSelectedLayout(layout);
    };

    const renderLayout = () => {
        if (selectedLayout === 'Loss curve') {
            return (props.neurons ? <Chart data={props.lossyarray} /> : <Loading />);
        } else if (selectedLayout === 'Heatmap') {
            return (props.neurons ? <Heatmap slider={props.slider} neurons={props.neurons} weights={props.weights} layers={props.layers} /> : <Loading />);
        } else if (selectedLayout === 'Space') {
            return (props.neurons ? <Space neurons={props.neurons} /> : <Loading />);
        } else if (selectedLayout === 'Signal') {
            return <Signal amplitude={amplitude} frequency={frequency} />
        }
        return null;
    };

    return (
        <div className="switcher">
            <div className="boxGroup">
                <div className="box" onClick={() => handleLayoutChange("Loss curve")}><img src={loss} alt="loss" />Loss</div>
                <div className="box" onClick={() => handleLayoutChange("Heatmap")}><img src={heatmap} alt="heatmap" />Heatmap</div>
                <div className="box" onClick={() => handleLayoutChange("Space")}><img src={stars} alt="stars" />Space</div>
                <div className="box" onClick={() => handleLayoutChange("Signal")}><img src={wave} alt="wave" />Signal</div>
            </div>
            {/* <div className="chooser">
                <h3>Choose visualization</h3>
                <ToggleButtonGroup type="radio" className="visualizationRadio" name="options" defaultValue="layout1">
                    <ToggleButton id="tbg-radio-1" variant="secondary" value="layout1" checked={selectedLayout === 'layout1'} onChange={handleLayoutChange}>
                        Loss
                    </ToggleButton>
                    <ToggleButton id="tbg-radio-2" variant="secondary" value="layout2" checked={selectedLayout === 'layout1'} onChange={handleLayoutChange}>
                        Heatmap
                    </ToggleButton>
                    <ToggleButton id="tbg-radio-3" variant="secondary" value="layout3" checked={selectedLayout === 'layout1'} onChange={handleLayoutChange}>
                        Space
                    </ToggleButton>
                    <ToggleButton id="tbg-radio-4" variant="secondary" value="layout4" checked={selectedLayout === 'layout1'} onChange={handleLayoutChange}>

                        Signal
                    </ToggleButton>
                </ToggleButtonGroup>
            </div> */}

            <div className="layout-container">
                <animated.div
                    style={{
                        ...opacityProps,
                    }}
                >

                    <div>{selectedLayout}</div>
                    {/* {LayoutComponent} */}
                    {renderLayout()}
                </animated.div>
            </div>
        </div>
    );
}

export default LayoutSwitcher;
