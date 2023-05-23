import { useEffect, useState } from "react";
import Loading from "./Loading";
import Heatmap from "./Heatmap";
import Chart from "./Chart";
import Space from "./Space";

import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

import { useSpring, animated } from '@react-spring/web';


const LayoutSwitcher = (props) => {
   //const lossyarray = props;
    //console.log(data)
    //const weights = props ? props.weights : 0

    const opacityProps = useSpring({
        config: { duration: 1000 },
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

    const Layout1 = () => {
        return (
            <animated.div
                style={{
                    ...opacityProps,
                }}
            >
                The plot represents the loss function of our neural network.
                <div>
                    {props.lossyarray ? <Chart data={props.lossyarray} /> : <Loading />} 
                </div>
                
            </animated.div>
        );
    };

    const Layout2 = () => {
        return (
            <animated.div
                style={{
                    ...opacityProps,
                }}
            >
            <div className="visualization">
                The heatmap represents the values of weights. 
                <div>
                        {props.lossyarray ? <Heatmap neurons={props.neurons} weights={props.weights} layers={props.layers} /> : <Loading />}
                </div>
            </div>
            </animated.div>
        );
    };

    const Layout3 = () => {
        return (
            <div>
            { props.neurons ? <Space neurons={props.neurons}/> : <Loading/> }
            </div>
        );
    };


    let LayoutComponent;
    if (selectedLayout === 'layout1') {
        // if(props.data == null) {
        //     LayoutComponent = <Loading/>
        // } else {
        //     LayoutComponent = <Layout1 />;
        // }
        LayoutComponent = <Layout1 />;
    } else if (selectedLayout === 'layout2') {
        LayoutComponent = <Layout2 />;
    } else if (selectedLayout === 'layout3') {
        LayoutComponent = <Layout3 />;
    }

    return(
        <div className="layout-container">
            <animated.div
                style={{
                    ...opacityProps,
                }}
            ><h3>Choose visualization</h3></animated.div>
            

            <ToggleButtonGroup type="radio" name="options" defaultValue="layout1">
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

            {/* <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
            <label className="radio"><input type="radio" class="btn-check" name="btnradio" value="layout1" checked={selectedLayout === 'layout1'} onChange={handleLayoutChange} /> Loss </label>
            <label className="radio"><input type="radio" value="layout2" checked={selectedLayout === 'layout2'} onChange={handleLayoutChange} /> Heatmap </label>
            <label className="radio"><input type="radio" value="layout3" checked={selectedLayout === 'layout3'} onChange={handleLayoutChange} /> L3</label>
            </div> */}
            {/* {props.data ? LayoutComponent : <Loading/>} */}
            {LayoutComponent}
        </div>
    );
}

export default LayoutSwitcher;
// export function LayoutView({ layout }) {
//     if (layout === 'listView') {
//         // Render list view layout
//         return (
//             <div>
//                 {/* List view layout */}
//             </div>
//         );
//     } else if (layout === 'gridView') {
//         // Render grid view layout
//         return (
//             <div>
//                 {/* Grid view layout */}
//             </div>
//         );
//     } else {
//         // Handle unknown layout value
//         return (
//             <div>
//                 Unknown layout: {layout}
//             </div>
//         );
//     }
// }

// export function SwitchBetweenLayout(event) {
//     const [layout, setLayout] = useState('listView');

//     const onClick = (event) => {
//         const currentLayout = event.target.value; // gets 'listView' or 'gridView'
//         setLayout(currentLayout); // only set if state is changed.
//     };

//     return (
//         //HTML for 2 buttons with click handler

//         <LayoutView layout={layout} />

//     )
// }



// import React, { useState } from 'react';

// const RadioButton = ({ label, checked, onChange }) => (
//     <label>
//         <input
//             type="radio"
//             checked={checked}
//             onChange={onChange}
//         />
//         {label}
//     </label>
// );

// export const LayoutSwitcher = () => {
//     const [layout, setLayout] = useState('grid');

//     const handleLayoutChange = (event) => {
//         setLayout(event.target.value);
//     };

//     return (
//         <div>
//             {/* <h2>Layout Switcher</h2> */}
//             <RadioButton
//                 label="Loss function"
//                 checked={layout === 'loss'}
//                 onChange={handleLayoutChange}
//                 value="loss"
//             />
//             <RadioButton
//                 label="Heatmap"
//                 checked={layout === 'heatmap'}
//                 onChange={handleLayoutChange}
//                 value="heatmap"
//             />

//             {/* Render different components based on the selected layout */}
//             {/* {layout === 'grid' ? <LossView /> : <HeatmapView />} */}

            
//         </div>
//     );
// };

// const LossView = () => (
//     <div>
//         <h3>Loss function</h3>
//         {/* Your grid view component */}
//     </div>
// );

// const HeatmapView = () => (
//     <div>
//         <h3>Heatmap</h3>
//         {/* Your list view component */}
//     </div>
// );

// //export const LayoutSwitcher;
