import { useEffect, useState, useRef } from "react";
import Loading from "./Loading";
import Heatmap from "./Heatmap";
import Chart from "./Chart";
import Space from "./Space";

import React, { memo } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

import { useSpring, animated } from '@react-spring/web';

import Slider from "./Slider";

// const opacityProps = useSpring({
//     config: { duration: 1200 },
//     textShadow: `0 25px 50px -12px #000;`,
//     from: { opacity: 0, y: -10 },
//     to: { opacity: 1, y: 0 }
// });

const LossChart = memo(({ lossyarray }) => {
    return (
        <Chart data={lossyarray} />
    );
});

const HeatmapChart = memo(({ slider, neurons, weights, layers }) => {
    return (
        <Heatmap slider={slider} neurons={neurons} weights={weights} layers={layers} />
    );
});


const LayoutSwitcher = (props) => {
    //const lossyarray = props;
    //console.log(data)
    //const weights = props ? props.weights : 0
    //const prevSeriesRef = useRef(props.series);

    // const MemoizedLossChart = memo(LossChart);
    // const MemoizedHeatmapChart = memo(HeatmapChart);

    const opacityProps = useSpring({
        config: { duration: 1200 },
        textShadow: `0 25px 50px -12px #000;`,
        from: { opacity: 0, y: -10 },
        to: { opacity: 1, y: 0 }
    });
    //console.log(props.lossyarray)

    // const layer_number = props.layers
    // const neuron_number = props.neurons
    // const weights = props.weights


    // PROBABLY MORM DT USESTATE ZA ŠT NEURONOV DA NISO UNDEFINED


    const [selectedLayout, setSelectedLayout] = useState('layout1');
    const handleLayoutChange = (event) => {
        //console.log("changed!")
        setSelectedLayout(event.target.value);
    };

    // useEffect(() => {
    //     prevSeriesRef.current = props.series;
    // }, [props.series]);

    const renderLayout = () => {
        if (selectedLayout === 'layout1') {
            return <Chart data={props.lossyarray} />;
        } else if (selectedLayout === 'layout2') {
            return <Heatmap slider={props.slider} neurons={props.neurons} weights={props.weights} layers={props.layers} />;
        } else if (selectedLayout === 'layout3') {
            return <Space neurons={props.neurons} />;
        }
        return null;
    };


    // const Layout1 = () => {
    //     return (
    //         <animated.div
    //             style={{
    //                 ...opacityProps,
    //             }}
    //         > 
    //             The plot represents the loss function of our neural network.
    //             {/* <Loading/> */}

    //             {props.neurons ? <Chart data={props.lossyarray} /> : <Loading />} 


    //         </animated.div>
    //     );
    // };

    // const Layout2 = () => {
    //     const isSeriesEqual = props.series === prevSeriesRef.current;
    //     return (
    //         <animated.div
    //             style={{
    //                 ...opacityProps,
    //             }}
    //         >
    //         <div>
    //             The heatmap represents the values of weights. 

    //                 {props.neurons && isSeriesEqual ? (<Heatmap slider={props.slider} neurons={props.neurons} weights={props.weights} layers={props.layers} />) : <Loading />}

    //         </div>
    //         </animated.div>
    //     );
    // };

    // const Layout3 = () => {
    //     return (
    //         <div>
    //         { props.neurons ? <Space neurons={props.neurons}/> : <Loading/> }
    //         </div>
    //     );
    // };


    // let LayoutComponent;
    // if (selectedLayout === 'layout1') {
    //     // if(props.data == null) {
    //     //     LayoutComponent = <Loading/>
    //     // } else {
    //     //     LayoutComponent = <Layout1 />;
    //     // }
    //     LayoutComponent = <MemoizedLossChart lossyarray={props.lossyarray} />;;
    // } else if (selectedLayout === 'layout2') {
    //     LayoutComponent = <MemoizedHeatmapChart slider={props.slider} neurons={props.neurons} weights={props.weights} layers={props.layers} />;
    // } else if (selectedLayout === 'layout3') {
    //     // LayoutComponent = <Layout3 />;
    //}

    return (
        <div className="layout-container">
            <animated.div
                style={{
                    ...opacityProps,
                }}
            ><h3>Choose visualization</h3>


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
                </ToggleButtonGroup>
                {/* <div>
                    <Dropdown.Menu show>
                        <Dropdown.Header>Choose dataset</Dropdown.Header>
                        <Dropdown.Item eventKey="2" value="moons" onClick={() => datasetHandler('moons')}>Moons</Dropdown.Item>
                        <Dropdown.Item eventKey="3" value="circles" onClick={() => datasetHandler('circles')}>Circles</Dropdown.Item>
                    </Dropdown.Menu>
                </div> */}

                {/* <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
            <label className="radio"><input type="radio" class="btn-check" name="btnradio" value="layout1" checked={selectedLayout === 'layout1'} onChange={handleLayoutChange} /> Loss </label>
            <label className="radio"><input type="radio" value="layout2" checked={selectedLayout === 'layout2'} onChange={handleLayoutChange} /> Heatmap </label>
            <label className="radio"><input type="radio" value="layout3" checked={selectedLayout === 'layout3'} onChange={handleLayoutChange} /> L3</label>
            </div> */}
                {/* {props.data ? LayoutComponent : <Loading/>} */}
                {/* {LayoutComponent} */}
                {renderLayout()}
            </animated.div>
        </div>
    );
}

export default LayoutSwitcher;
