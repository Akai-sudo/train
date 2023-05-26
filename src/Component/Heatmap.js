import ReactApexChart from 'react-apexcharts';
import { useRef, useEffect, useState } from "react";
import React from "react";
import { scaleLinear } from 'd3-scale';
import { interpolateRgb } from 'd3-interpolate';

import Slider from './Slider';

import { createContext, useContext } from 'react';



function Heatmap(props) {
    //const SeriesContext = createContext();
    const weights = props.weights
    const layers = props.layers
    const neurons = props.neurons
    const slider = props.slider

    //const prevSliderRef = useRef()
    //console.log("SLIDER" + slider)
    //console.log(weights)

    //console.log(weights[0])
    //console.log("alo" + weights[0])
    // const seriesNames = props.layers;
    // const values = props.weights;

    // if (values !== undefined) {
    //     const dataStructure = seriesNames.map((name, index) => ({
    //         name,
    //         data: values[index].map((value, i) => ({ x: `W${i + 1}`, y: value }))
    //     }));
    //     console.log(dataStructure)
    // }

    // const eachEpoch = []
    // for (let i = 0; i < 5; i++) {
    //     eachEpoch.push()
    // }

    // const arrWeights = []
    // for(let i = 0; i < weights.length; i++) {
    //     for (let j = 0; j < weights[i].length; j++) {

    //     }

    // }

    // function useSeriesContext() {
    //     const context = useContext(SeriesContext);
    //     if (!context) {
    //         throw new Error('useSeriesContext must be used within a SeriesContext.Provider');
    //     }
    //     return context;
    // }

    // function convertRange(value, r1, r2) {
    //     return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
    // }
    const [series, setSeries] = useState([]);

    // const mappedWeights = []
    // for (let i = 0; i < weights[0].length; i++) {

    //     mappedWeights.push({ name: `Layer ${i + 1}`, data: weights[0][i] });
    // }
    // console.log(mappedWeights);

    // setSeries(mappedWeights);
    //console.log(weights[slider])
    useEffect(() => {
        // if (prevSliderRef.current !== slider) {
        //     prevSliderRef.current = slider;
        const mappedWeights = [];
        // for (let i = 0; i < weights[0].length; i++) {
        //     const layerWeights = [];
        //     for (let j = 0; j < weights.length; j++) {
        //         layerWeights.push({ x: `W${j + 1}`, y: weights[0][j] });
        //     }
        //     mappedWeights.push({ name: `Layer ${i + 1}`, data: layerWeights });
        // }

        // mappedWeights.push({
        //     name: `Layer ${i + 1}`, data: [{ x: `W${i + 1}`, w: weights[0][i] }]
        // });

        for (let i = 0; i < weights[slider].length; i++) {


            mappedWeights.push({
                name: `Layer ${i + 1}`,
                data: weights[slider][i].map((value, j) => ({ x: `W${j + 1}`, y: value }))
            });

            //}
            setSeries(mappedWeights);
        }
        // mappedWeights.push({
        //     name: `Layer ${i + 1}`,
        //     data: weights[0][i].map((value, j) => ({ x: `W${j + 1}`, y: value }))
        // });

        //     console.log(mappedWeights)

        //     //setSeries(mappedWeights);
        // }, []);
        //console.log(mappedWeights)
    }, [slider, weights]);






    // const series = weights[0].map((data, index) => {
    //     const newData = [];

    //     for (let i = 0; i < data.data.length; i++) {
    //         // Perform additional logic here
    //         // You can access each data point using data.data[i]
    //         // Modify or process the data as needed

    //         newData.push({ x: `W${i + 1}`, y: data.data[i] });
    //     }

    //     return {
    //         name: data.name,
    //         data: newData
    //     };
    // });


    // const [series, setSeries] = useState(

    //     [
    //         {
    //             name: "Series 1",
    //             data: [
    //                 { x: 'W1', y: 0 },
    //                 { x: 'W2', y: 10 },
    //                 { x: 'W3', y: 13 },
    //                 { x: 'W4', y: 32 }
    //             ]
    //         },
    //         {
    //             name: "Series 2",
    //             data: [
    //                 { x: 'W1', y: 43 },
    //                 { x: 'W2', y: 43 },
    //                 { x: 'W3', y: 43 },
    //                 { x: 'W4', y: 43 }
    //             ]
    //         },
    //         {
    //             name: "Series 3",
    //             data: [
    //                 { x: 'W1', y: 50 },
    //                 { x: 'W2', y: 65 },
    //                 { x: 'W3', y: 75 },
    //                 { x: 'W4', y: 88 }
    //             ]
    //         }
    //     ]
    // );


    const [options, setOptions] = useState({
        // chart: {
        //     height: 500,
        //     width: 500,
        //     type: 'heatmap',
        //     background: '#353535', // Set the background color here
        //     animations: {
        //         disabled: true
        //     }
        // },
        // theme: {
        //     monochrome: {
        //         enabled: true,
        //         color: '#E7842D',
        //         shadeTo: 'black',
        //         shadeIntensity: 100
        //     }
        // },
        // theme: {
        //     mode: 'light',
        //     //palette: 'palette1',
        // },
        plotOptions: {
            heatmap: {
                radius: 2,
                enableShades: true,
                inverse: true,
                colorScale: {
                    ranges: [

                        // from: 0,
                        // to: 1,
                        // color: (value) => {
                        //     const colorScale = scaleLinear()
                        //         .domain([0, 100])
                        //         .range(['#989898', '#E7842D'])
                        //         .interpolate(interpolateRgb);

                        //     return colorScale(value);
                        // },
                        // color: (value) => {
                        //     const colorScale = scaleLinear()
                        //         .domain([0, 100])
                        //         .range(['#989898', '#E7842D'])
                        //         .interpolate(interpolateRgb);

                        //     return colorScale(value);
                        // },
                        {
                            from: -1,
                            to: 0,
                            color: "#989898" // Gray color at value 0
                        },
                        {
                            from: 0,
                            to: 1,
                            color: "#ff7700" // #E7842D color at value 1 to 100
                        }
                    ]
                },
                // colorScale: {
                //     ranges: [
                //         {
                //             from: 0,
                //             to: 100,
                //             //color: '#E7842D' // Set the color for the heatmap
                //             //colors: ['#989898', '#E7842D']
                //             color: [
                //                 {
                //                     value: 0,
                //                     color: '#989898'
                //                 },
                //                 {
                //                     value: 100,
                //                     color: '#E7842D'
                //                 }
                //             ]
                //         }
                //     ]
                // },


                stroke: {
                    show: false,
                    width: 0,
                    colors: undefined
                }
            }
        },
        grid: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        title: {
            text: 'Weight values',
            floating: false,
            style: {
                fontSize: '18px',
                fontFamily: 'Satoshi',
                fontWeight: 'medium',
                color: '#E7842D' // Set the text color here
            }
        },
        strokeOpacity: 0,
        //colors: ["#E7842D"],

        stroke: {
            show: false,
        },
        xaxis: {
            labels: {
                style: {
                    colors: '#989898',
                }
            }
        },
        yaxis: {
            // grid: {
            //     lines: [] // Set to false to remove the horizontal grid lines
            // },
            labels: {
                style: {
                    colors: '#989898',
                }
            },
            min: 0
        }
    });


    return (
        // <SeriesContext.Provider value={{ series, setSeries }}>
        <React.Fragment>
            <ReactApexChart options={options} series={series} type="heatmap" width={1000} height={400} background="#353535" animations={{
                enabled: false,
            }} />
        </React.Fragment>
        // </SeriesContext.Provider>
    );
}


export default React.memo(Heatmap);
