import ReactApexChart from 'react-apexcharts';
import { useRef, useEffect, useState } from "react";
import React from "react";
import { scaleLinear } from 'd3-scale';
import { interpolateRgb } from 'd3-interpolate';

import Slider from './Slider';

function Heatmap(props) {
    //const SeriesContext = createContext();
    const weights = props.weights
    const layers = props.layers
    const neurons = props.neurons
    const slider = props.slider

    const currentEpoch = weights[slider]

    //console.log("Current epoch:", slider)
    //console.log(currentEpoch)

    // function convertRange(value, r1, r2) {
    //     return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
    // }
    // function scale_interval(array) {
    //     // //const flat_magnitudes = magnitudes.flat();
    //     // let min = -1;
    //     // let max = 1;
    //     // for (let row of magnitudes) {
    //     //     for (let value of row) {
    //     //         if (value < min) {
    //     //             min = value;
    //     //         }
    //     //         if (value > max) {
    //     //             max = value;
    //     //         }
    //     //     }
    //     // }
    //     // const range = max - min
    //     // //const scaled_magnitude = ((magnitudes - min) / range) * 2 - 1;
    //     // // const scaled_magnitude = array.map((row) =>
    //     // //     row.map((value) => ((value - minValue) / range) * 2 - 1)
    //     // // );
    //     // const scaled_magnitude = magnitudes.map((row) =>
    //     //     row.map((value) => ((value - min) / range) * 2 - 1)
    //     // );
    //     // return scaled_magnitude;
    //     let min = Infinity;
    //     let max = -Infinity;

    //     // Find the minimum and maximum values
    //     for (let i = 0; i < array.length; i++) {
    //         // for (let value of Object.values(row)) {
    //         //     if (typeof value === "number") {
    //         //         if (value < minValue) {
    //         //             minValue = value;
    //         //         }
    //         //         if (value > maxValue) {
    //         //             maxValue = value;
    //         //         }
    //         //     }
    //         // }
    //         if (array[i] < min) {
    //             min = array[i]
    //         }
    //         if (array[i] > max) {
    //             max = array[i]
    //         }

    //     }

    //     const range = max - min;
    //     const scaledArray = array.map((row) =>
    //         Object.keys(row).reduce((scaledRow, key) => {
    //             const value = row[key];
    //             if (typeof value === "number") {
    //                 scaledRow[key] = ((value - min) / range) * 2 - 1;
    //             }
    //             return scaledRow;
    //         }, {})
    //     );
    //     return scaledArray;
    // }

    const [series, setSeries] = useState([]);


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

        // for (let i = 0; i < currentEpoch.length; i++) {

        //     for (let j = 0; j < currentEpoch[i].length; j++) {

        //         mappedWeights.push({
        //             name: `Layer ${j + 1}`,
        //             data: currentEpoch[i].map((value, weight_index) => ({ x: `W${weight_index + 1}`, y: value }))
        //         });

        //         //}

        //     }
        // }
        for (let layer in currentEpoch) {
            if (currentEpoch.hasOwnProperty(layer)) {
                const magnitudes = currentEpoch[layer];
                //console.log("ADA", magnitudes)
                //const scaled_magnitudes = scale_interval(magnitudes)
                const min = Math.min(...magnitudes);
                const max = Math.max(...magnitudes);
                let scaled = magnitudes;
                if (magnitudes.length > 1) {

                    const range = max - min;
                    scaled = magnitudes.map((value) => (2 * (value - min) / range) - 1);
                    //console.log("SKALA", scaled)
                }


                mappedWeights.push({
                    name: `Layer ${layer}`,
                    //data: [{ x: `W${index}`, y: magnitude }],
                    data: scaled.map((value, weight_index) => ({ x: `W${weight_index + 1}`, y: value }))
                });
                // for (let weights in layer) {
                //     let index = 0;
                //     if (layer.hasOwnProperty(weights)) {
                //         const magnitude = currentEpoch[layer][weights]
                //         //console.log(magnitude)
                //         mappedWeights.push({
                //             name: `Layer ${layer}`,
                //             data: [{ x: `W${index}`, y: magnitude }],
                //             //data: currentEpoch[i].map((value, weight_index) => ({ x: `W${weight_index + 1}`, y: value }))
                //         });

                //     }
                //     index++;
                // }
            }
        }
        //console.log(mappedWeights)
        setSeries(mappedWeights);
        // console.log(currentEpoch)
        // for (let i = 0; i < currentEpoch.length; i++) {
        //     const layerWeights = currentEpoch[i].map((value, weight_index) => ({ x: `W${weight_index + 1}`, y: value }));
        //     console.log("Dobljeni: ", i)
        //     mappedWeights.push({ name: `Layer ${i + 1}`, data: layerWeights });
        //}
        //setSeries(mappedWeights);
        //console.log("Mapped: ", mappedWeights)
        //setSeries(mappedWeights);
        // mappedWeights.push({
        //     name: `Layer ${i + 1}`,
        //     data: weights[0][i].map((value, j) => ({ x: `W${j + 1}`, y: value }))
        // });

        //     console.log(mappedWeights)

        //     //setSeries(mappedWeights);
        // }, []);
        //console.log(mappedWeights)
    }, [currentEpoch, weights]);






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

        chart: {
            height: 500,
            width: 1000,
            type: 'heatmap',
            background: '#353535', // Set the background color here
            animations: {
                disabled: false,
            },
        },
        // theme: {
        //     monochrome: {
        //         enabled: true,
        //         color: '#E7842D',
        //         shadeTo: 'black',
        //         shadeIntensity: 1
        //     }
        // },
        // theme: {
        //     mode: 'light',
        //     //palette: 'palette1',
        // },
        plotOptions: {
            heatmap: {
                radius: 4,
                enableShades: true,
                inverse: false,
                shadeIntensity: 0.5,
                reverseNegativeShade: true,
                min: -1,
                max: 1,
                colorScale: {
                    ranges: [
                        {
                            from: -1,
                            to: 0,
                            color: "#989898",
                            name: 'low magnitude',
                            //foreColor: "#fff",
                        },
                        {
                            from: 0,
                            to: 1,
                            color: "#E7842D", // #E7842D color at value 1 to 100
                            name: 'high magnitude',
                        }
                    ],
                },

            }
        },
        grid: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        title: {
            text: 'Heatmap',
            floating: true,
        },

        stroke: {
            show: true,
            width: 2,
            colors: "#E7842D",
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
            {/* <ReactApexChart options={options} series={series} type="heatmap" width={1000} height={400} background="#353535" animations={{
                enabled: true,
            }} /> */}
            <ReactApexChart height={360} type="heatmap" options={options} series={series} />
        </React.Fragment>
        // </SeriesContext.Provider>
    );
}


export default React.memo(Heatmap);
